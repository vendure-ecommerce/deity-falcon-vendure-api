import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
    AddToCartMutationArgs,
    Cart,
    CartItemPayload,
    Category,
    CategoryQueryArgs,
    Customer,
    ProductList,
    ProductQueryArgs,
    ProductsCategoryArgs,
    RemoveCartItemMutationArgs,
    RemoveCartItemResponse,
    SortOrderDirection,
    UpdateCartItemMutationArgs,
} from './generated/falcon-types';
import {
    AddToOrder,
    AdjustItemQty,
    GetActiveOrder,
    GetCategoriesList,
    GetProduct,
    RemoveItem,
    SearchProducts,
    SearchResultSortParameter,
    SortOrder,
} from './generated/vendure-types';
import {
    ACTIVE_ORDER,
    ADD_TO_ORDER,
    ADJUST_ITEM_QTY,
    GET_ALL_CATEGORIES,
    GET_PRODUCT,
    REMOVE_ITEM,
    SEARCH_PRODUCTS,
} from './gql-documents';
import { orderToCart, partialOrderToCartItem, searchResultToProduct, vendureProductToProduct } from './utils';
import { SessionData, VendureApiBase, VendureApiParams } from './vendure-api-base';

// We cache the list of all categories to avoid having to make a request each time
let allCategoriesCache: Promise<GetCategoriesList.Items[]> | undefined;

// Falcon specifies products by sku, whereas Vendure
// deals with ids. Therefore we need to map between them.
// Each time a ProductVariant is loaded, we need to add to
// this map.
const skuMap = new Map<string, string>();

module.exports = class VendureApi extends VendureApiBase {

    constructor(params: VendureApiParams) {
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
        const { product } = await this.query<GetProduct.Query, GetProduct.Variables>(GET_PRODUCT, { id });
        if (product) {
            product.variants.forEach(v => skuMap.set(v.sku, v.id));
            return vendureProductToProduct(product);
        } else {
            return null;
        }
    }

    async customer(): Promise<Customer> {
        return null as any;
    }

    async addToCart(obj: any, args: AddToCartMutationArgs): Promise<CartItemPayload> {
        const { input } = args;
        const variantId = skuMap.get(input.sku);
        if (!variantId) {
            throw new Error(`Could not find the id of the product with sku "${input.sku}"`);
        }
        const result = await this.query<AddToOrder.Mutation, AddToOrder.Variables>(ADD_TO_ORDER, {
            id: variantId,
            qty: input.qty,
        });
        if (!result.addItemToOrder) {
            throw new Error(`Could not add to cart"`);
        }
        return partialOrderToCartItem(result.addItemToOrder, variantId);
    }

    async updateCartItem(obj: any, args: UpdateCartItemMutationArgs): Promise<CartItemPayload> {
        const { input } = args;
        const session: SessionData = this.session;
        const line = this.getOrderLineFor(input.itemId);
        const result = await this.query<AdjustItemQty.Mutation, AdjustItemQty.Variables>(ADJUST_ITEM_QTY, {
            id: line.id,
            qty: input.qty,
        });
        if (!result.adjustItemQuantity) {
            throw new Error(`Could not adjust cart quantity"`);
        }
        return partialOrderToCartItem(result.adjustItemQuantity, input.itemId.toString());
    }

    async removeCartItem(obj: any, args: RemoveCartItemMutationArgs): Promise<RemoveCartItemResponse> {
        const { input } = args;
        const line = this.getOrderLineFor(input.itemId);
        const result = await this.query<RemoveItem.Mutation, RemoveItem.Variables>(REMOVE_ITEM, {
            id: line.id,
        });
        if (!result.removeItemFromOrder) {
            throw new Error(`Could not remove item from cart"`);
        }
        return { itemId: input.itemId };
    }

    async cart(): Promise<Cart> {
        const result = await this.query<GetActiveOrder.Query, GetActiveOrder.Variables>(ACTIVE_ORDER);
        const order = result.activeOrder;

        if (!order) {
            return {
                items: [],
            };
        }
        this.session.order = order;
        return orderToCart(order);
    }

    /**
     * Retrieve all available ProductCategories from the Vendure server and cache them.
     */
    private async getAllCategories(): Promise<GetCategoriesList.Items[]> {
        if (allCategoriesCache) {
            return allCategoriesCache;
        }
        allCategoriesCache = this.query<GetCategoriesList.Query, GetCategoriesList.Variables>(GET_ALL_CATEGORIES, {
            options: {
                take: 999,
            },
        }).then(res => res.productCategories.items);
        return allCategoriesCache;
    }

    /**
     * Given an itemId (aka a Vendure ProductVariant id as represented in Falcon), returns the OrderLine
     * containing that variant.
     */
    private getOrderLineFor(itemId: number): GetActiveOrder.Lines {
        const session: SessionData = this.session;
        if (!session.order) {
            throw new Error(`No order found in session`);
        }
        const line = session.order.lines.find(l => l.productVariant.id === itemId.toString());
        if (!line) {
            throw new Error(`No OrderLine found containing the productId "${itemId}"`);
        }
        return line;
    }
};
