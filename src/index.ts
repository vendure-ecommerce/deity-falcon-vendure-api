import {
    ApiDataSource,
    ApiUrlPriority,
    FetchUrlParams,
    FetchUrlResult,
    GraphQLContext,
} from '@deity/falcon-server-env';
import { ConfigurableContainerConstructorParams } from '@deity/falcon-server-env/src/models/ApiDataSource';
import { ConfigurableConstructorParams } from '@deity/falcon-server-env/src/types';
import { DocumentNode, GraphQLResolveInfo, print } from 'graphql';
import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
    Cart,
    Category,
    CategoryQueryArgs,
    Customer,
    ProductList,
    ProductQueryArgs,
    ProductsCategoryArgs,
    SortOrderDirection,
} from './generated/falcon-types';
import {
    GetCategoriesList,
    GetProduct,
    SearchProducts,
    SearchResultSortParameter,
    SortOrder,
} from './generated/vendure-types';
import { GET_ALL_CATEGORIES, GET_PRODUCT, SEARCH_PRODUCTS } from './gql-documents';
import { searchResultToProduct, vendureProductToProduct } from './utils';

export interface VendureApiConfig {
    host: string;
    port: number;
    apiPath: string;
    protocol: 'http' | 'https';
}

export type VendureApiParams = ConfigurableContainerConstructorParams & ConfigurableConstructorParams<VendureApiConfig>;

module.exports = class VendureApi extends ApiDataSource {

    private allCategories: Promise<GetCategoriesList.Items[]> | undefined;

    constructor(private params: VendureApiParams) {
        super(params);
        this.addTypeResolvers();
    }

    /**
     * Adds additional resolve functions to the stitched GQL schema for the sake of data-splitting
     */
    addTypeResolvers() {
        const resolvers = {
            Category: {
                products: (...args: [Category, ProductsCategoryArgs]) => this.categoryProducts(...args),
            },
        };
        addResolveFunctionsToSchema({ schema: (this.gqlServerConfig as any).schema, resolvers });
    }

    getFetchUrlPriority(url: string): number {
        return ApiUrlPriority.HIGH;
    }

    async fetchUrl(obj: object, args: FetchUrlParams, context: GraphQLContext, info: GraphQLResolveInfo): Promise<FetchUrlResult> {
        const { path } = args;
        if (path.indexOf('category/') === 0) {
            const matches = path.match(/category\/(\d+)/);
            if (matches) {
                return {
                    id: matches[1],
                    path,
                    type: `shop-category`,
                };
            }
        }
        if (path.indexOf('product/') === 0) {
            const matches = path.match(/product\/(\d+)/);
            if (matches) {
                return {
                    id: matches[1],
                    path,
                    type: `shop-product`,
                };
            }
        }
        return {
            id: 0,
            path,
            type: `shop-category`,
        };
    }

    async category(obj: any, args: CategoryQueryArgs): Promise<Category> {
        const allCategories = await this.getAllCategories();
        const matchingCategory = allCategories.find(c => c.id === args.id);
        return {
            id: matchingCategory ? matchingCategory.id : '',
            name: matchingCategory ? matchingCategory.name : '',
            children: matchingCategory ? matchingCategory.children : [],
            description: matchingCategory ? matchingCategory.description : '',
            breadcrumbs: [],
        };
    }

    async categoryProducts(obj: Category, args: ProductsCategoryArgs): Promise<ProductList> {
        const { pagination, filters, sort } = args;

        const allCategories = await this.getAllCategories();
        const matchingCategory = allCategories.find(c => c.id === obj.id);
        let facetValueIds: string[] = [];
        if (matchingCategory) {
            facetValueIds = matchingCategory.facetValues.map(fv => fv.id)
                .concat(matchingCategory.ancestorFacetValues.map(fv => fv.id));
        }

        const currentPage = (pagination && pagination.page) || 1;
        const perPage = (pagination && pagination.perPage) || 20;
        const take = perPage;
        const skip = (currentPage - 1) * perPage;
        const vendureSort: SearchResultSortParameter = {};
        if (sort && sort.field === 'name') {
            vendureSort.name = sort.direction === SortOrderDirection.asc ? SortOrder.ASC : SortOrder.DESC;
        }
        if (sort && sort.field === 'price') {
            vendureSort.price = sort.direction === SortOrderDirection.asc ? SortOrder.ASC : SortOrder.DESC;
        }

        const response = await this.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
            input: {
                groupByProduct: true,
                facetIds: facetValueIds,
                take,
                skip,
                sort: vendureSort,
            },
        });

        return {
            items: response.search.items.map(i => searchResultToProduct(i)),
            aggregations: [],
            pagination: {
                totalItems: response.search.totalItems,
                currentPage,
                nextPage: 2,
                perPage,
                totalPages: response.search.totalItems,
            },
        };

    }

    async product(obj: any, args: ProductQueryArgs) {
        const { id } = args;
        const response = await this.query<GetProduct.Query, GetProduct.Variables>(GET_PRODUCT, { id });
        if (response.product) {
            return vendureProductToProduct(response.product);
        } else {
            return null;
        }
    }

    async customer(): Promise<Customer> {
        return null as any;
    }

    async cart(): Promise<Cart> {
        return {
            active: true,
            virtual: false,
            items: [],
            itemsCount: 0,
            itemsQty: 0,
            totals: [],
            quoteCurrency: 'GBP',
            couponCode: '',
            billingAddress: null,
        };
    }

    /**
     * Retrieve all available ProductCategories from the Vendure server and cache them.
     */
    private getAllCategories(): Promise<GetCategoriesList.Items[]> {
        if (this.allCategories) {
            return this.allCategories;
        }
        return this.query<GetCategoriesList.Query, GetCategoriesList.Variables>(GET_ALL_CATEGORIES, {
            options: {
                take: 999,
            },
        }).then(res => res.productCategories.items);
    }

    /**
     * Make a GraphQL query via POST to the Vendure API.
     */
    private async query<T, V extends { [key: string]: any; }>(query: DocumentNode, variables?: V): Promise<T> {
        const apiPath = this.params.config && this.params.config.apiPath;
        if (!apiPath) {
            throw new Error(`No apiPath defined in the Falcon config`);
        }
        const response = await this.post(apiPath, {
            query: print(query),
            variables,
        });
        if (response.errors) {
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(response.errors[0], null, 2));
            throw new Error(response.errors[0].message);
        }
        return response.data;
    }
};
