import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
    AddAddressMutationArgs,
    Address,
    AddressList,
    AddressQueryArgs,
    AddToCartMutationArgs,
    Cart,
    CartItemPayload,
    Category,
    CategoryQueryArgs,
    ChangeCustomerPasswordMutationArgs,
    CountryList,
    Customer,
    EditAddressMutationArgs,
    EditCustomerMutationArgs, Maybe,
    MenuItem,
    Order,
    OrderQueryArgs,
    Orders,
    OrdersQueryArgs,
    PlaceOrderMutationArgs,
    PlaceOrderResult,
    ProductList,
    ProductQueryArgs,
    ProductsCategoryArgs,
    RemoveCartItemMutationArgs,
    RemoveCartItemResponse,
    RemoveCustomerAddressMutationArgs, RequestCustomerPasswordResetTokenMutationArgs, ResetCustomerPasswordMutationArgs,
    SetShippingMutationArgs,
    ShippingInformation,
    ShippingMethod,
    SignInMutationArgs,
    SignUpMutationArgs,
    SortOrderDirection,
    UpdateCartItemMutationArgs, ValidatePasswordTokenQueryArgs,
} from './generated/falcon-types';
import {
    AddPaymentToOrder,
    AddToOrder,
    AdjustItemQty,
    CreateAccount,
    CreateAddress,
    DeleteAddress,
    FullOrder,
    GetActiveOrder,
    GetCategoriesList,
    GetCountryList,
    GetCustomer,
    GetCustomerOrders,
    GetNextStates,
    GetOrder,
    GetOrderByCode,
    GetProduct,
    GetShippingMethods,
    LogIn,
    LogOut,
    RemoveItem, RequestPasswordReset, ResetPassword,
    SearchProducts,
    SearchResultSortParameter,
    SetCustomerForOrder,
    SetShippingMethod,
    SortOrder,
    TransitionOrderToState,
    UpdateAddress,
    UpdateCustomer, UpdatePassword,
} from './generated/vendure-types';
import {
    ACTIVE_ORDER,
    ADD_PAYMENT_TO_ORDER,
    ADD_TO_ORDER,
    ADJUST_ITEM_QTY,
    CREATE_ACCOUNT,
    CREATE_ADDRESS,
    DELETE_ADDRESS,
    GET_ALL_CATEGORIES,
    GET_COUNTRY_LIST,
    GET_CUSTOMER,
    GET_ORDER,
    GET_ORDER_BY_CODE,
    GET_ORDER_NEXT_STATES,
    GET_ORDERS,
    GET_PRODUCT,
    GET_SHIPPING_METHODS,
    LOG_IN,
    LOG_OUT,
    REMOVE_ITEM, REQUEST_PASSWORD_RESET, RESET_PASSWORD,
    SEARCH_PRODUCTS,
    SET_CUSTOMER_FOR_ORDER,
    SET_SHIPPING_METHOD,
    TRANSITION_ORDER_STATE,
    UPDATE_ADDRESS,
    UPDATE_CUSTOMER, UPDATE_PASSWORD,
} from './gql-documents';
import {
    activeCustomerToCustomer,
    categoryToMenuItem,
    falconAddressInputToVendure,
    orderToCart,
    orderToTotals,
    partialOrderToCartItem,
    searchResultToProduct,
    shippingQuoteToShippingMethod,
    vendureAddressToFalcon,
    vendureOrderToFalcon,
    vendureProductToProduct,
} from './utils';
import { SessionData, VendureApiBase, VendureApiParams } from './vendure-api-base';

// We cache the list of all categories to avoid having to make a request each time
let allCategoriesCache: Promise<GetCategoriesList.Items[]> | undefined;

// Falcon specifies products by sku, whereas Vendure
// deals with ids. Therefore we need to map between them.
// Each time a ProductVariant is loaded, we need to add to
// this map.
const skuMap = new Map<string, string>();

// The Falcon API does password reset in 2 stages, whereas Vendure combines token
// validation & password reset into a single call. For this reason, we generate a
// random temp password and set this to be the password on the validation step.
// On the reset step we use this to change the password to whatever was chosen
// by the user in the client app.
const PASSWORD_RESET_TEMP_PASSWORD = Math.random().toString(36).substring(3);

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

    async fetchBackendConfig(): Promise<any> {
        // TODO: fetch this data from the backend
        this.session.currency = 'USD';
        this.context.session.locale = 'en-US';

        return {
            locales: ['en-US'],
            defaultLocale: 'en-US',
        };
    }

    async menu(): Promise<MenuItem[]> {
        const allCategories = await this.getAllCategories();
        return allCategories
            .filter(category => category.parent.name === '__root_category__')
            .map(categoryToMenuItem(allCategories));
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
                groupByProduct: false,
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
                nextPage: currentPage + 1,
                perPage,
                totalPages: Math.floor(response.search.totalItems / perPage),
            },
        };

    }

    async product(obj: any, args: ProductQueryArgs) {
        const { id } = args;
        const [prodId, variantId] = id.split('-');
        const { product } = await this.query<GetProduct.Query, GetProduct.Variables>(GET_PRODUCT, { id: prodId });
        if (product) {
            product.variants.forEach(v => skuMap.set(v.sku, v.id));
            return vendureProductToProduct(product, variantId);
        } else {
            return null;
        }
    }

    async customer(): Promise<Customer | null> {
        const { activeCustomer } = await this.query<GetCustomer.Query>(GET_CUSTOMER);
        if (!activeCustomer) {
            return null;
        }
        (this.session as SessionData).customer = activeCustomer;
        return activeCustomerToCustomer(activeCustomer);
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

    async countries(): Promise<CountryList> {
        const result = await this.query<GetCountryList.Query>(GET_COUNTRY_LIST);
        return {
            items: result.availableCountries.map(c => ({
                englishName: c.name,
                localName: c.name,
                code: c.code,
                regions: [],
            })),
        };
    }

    async estimateShippingMethods(): Promise<ShippingMethod[]> {
        const result = await this.query<GetShippingMethods.Query>(GET_SHIPPING_METHODS);
        return result.eligibleShippingMethods.map(m => shippingQuoteToShippingMethod(m));
    }

    async setShipping(obj: any, args: SetShippingMutationArgs): Promise<ShippingInformation> {
        const { input } = args;
        const session: SessionData = this.session;
        if (!input) {
            throw new Error(`No input received for setShipping resolver`);
        }
        const address = input.shippingAddress;
        if (!address) {
            throw new Error(`No shippingAddress was specified`);
        }
        session.addressInput = address;
        const result = await this.query<SetShippingMethod.Mutation, SetShippingMethod.Variables>(SET_SHIPPING_METHOD, {
            addressInput: falconAddressInputToVendure(address),
            shippingMethodId: input.shippingMethodCode || '',
        });

        const { setOrderShippingMethod, setOrderShippingAddress } = result;
        if (!setOrderShippingAddress || !setOrderShippingMethod) {
            throw new Error(`Could not set the shipping method`);
        }
        return {
            paymentMethods: [
                { code: 'checkmo', title: 'Check / Money order' },
            ],
            totals: orderToTotals(setOrderShippingMethod),
        };
    }

    async placeOrder(obj: any, args: PlaceOrderMutationArgs): Promise<PlaceOrderResult> {
        const { input } = args;
        const session: SessionData = this.session;
        const paymentMethod = input.paymentMethod;
        if (!paymentMethod) {
            throw new Error(`No paymentMethod was specified`);
        }
        if (!session.customer) {
            const { billingAddress, email } = input;
            const { addressInput } = session;
            const address = billingAddress || addressInput;
            if (!address) {
                throw new Error(`No address information was specified`);
            }
            if (!email) {
                throw new Error(`No email address was specified`);
            }
            await this.query<SetCustomerForOrder.Mutation, SetCustomerForOrder.Variables>(SET_CUSTOMER_FOR_ORDER, {
                input: {
                    firstName: address.firstname || '',
                    lastName: address.lastname || '',
                    emailAddress: email,
                    phoneNumber: address.telephone,
                },
            });
        }
        await this.transitionOrderToState('ArrangingPayment');
        const { addPaymentToOrder } = await this.query<AddPaymentToOrder.Mutation, AddPaymentToOrder.Variables>(ADD_PAYMENT_TO_ORDER, {
            input: {
                method: 'example-payment-provider',
                metadata: {},
            },
        });
        if (!addPaymentToOrder) {
            throw new Error(`Could not add payment to order`);
        }
        session.lastOrderCode = addPaymentToOrder.code;
        return {
            orderId: +addPaymentToOrder.id,
            orderRealId: addPaymentToOrder.code,
        };
    }

    async lastOrder(): Promise<Order> {
        const { lastOrderCode } = this.session as SessionData;
        if (!lastOrderCode) {
            throw new Error(`Last order code is not defined`);
        }
        const { orderByCode } = await this.query<GetOrderByCode.Query, GetOrderByCode.Variables>(GET_ORDER_BY_CODE, {
            code: lastOrderCode,
        });
        if (!orderByCode) {
            throw new Error(`Could not find last order`);
        }
        return vendureOrderToFalcon(orderByCode);
    }

    async signIn(obj: any, args: SignInMutationArgs): Promise<boolean> {
        const { input } = args;
        const { login } = await this.query<LogIn.Mutation, LogIn.Variables>(LOG_IN, {
            username: input.email || '',
            password: input.password || '',
        });
        return !!login.user;
    }

    async signOut(): Promise<boolean> {
        const { logout } = await this.query<LogOut.Mutation>(LOG_OUT);
        const session: SessionData = this.session;
        session.customer = undefined;
        session.order = undefined;
        return logout;
    }

    async signUp(obj: any, args: SignUpMutationArgs): Promise<boolean> {
        const { input } = args;
        if (!input.email || !input.password) {
            throw new Error(`An email address and password must be provided`);
        }
        const { registerCustomerAccount } = await this.query<CreateAccount.Mutation, CreateAccount.Variables>(CREATE_ACCOUNT, {
            input: {
                firstName: input.firstname,
                lastName: input.lastname,
                emailAddress: input.email,
                password: input.password,
            },
        });
        return registerCustomerAccount;
    }

    async orders(obj: any, args: OrdersQueryArgs): Promise<Orders> {
        const { pagination } = args;
        const currentPage = (pagination && pagination.page) || 1;
        const perPage = (pagination && pagination.perPage) || 20;
        const take = perPage;
        const skip = (currentPage - 1) * perPage;
        const { activeCustomer } = await this.query<GetCustomerOrders.Query, GetCustomerOrders.Variables>(GET_ORDERS, {
            options: {
                take,
                skip,
                filter: {
                    active: {
                        eq: false,
                    },
                },
            },
        });
        if (!(activeCustomer && activeCustomer.orders)) {
            throw new Error(`Could not get the orders for the active Customer`);
        }
        const items = activeCustomer.orders.items.map(o => vendureOrderToFalcon(o));
        return {
            items,
            pagination: {
                currentPage,
                nextPage: currentPage + 1,
                totalItems: activeCustomer.orders.totalItems,
                perPage,
                totalPages: Math.floor(activeCustomer.orders.totalItems / perPage),
            },
        };
    }

    async order(obj: any, args: OrderQueryArgs): Promise<Order | null> {
        const { id } = args;
        const { order } = await this.query<GetOrder.Query, GetOrder.Variables>(GET_ORDER, {
            id: id.toString(),
        });
        if (!order) {
            return null;
        }
        return vendureOrderToFalcon(order);
    }

    async addresses(): Promise<AddressList | null> {
        const { activeCustomer } = await this.query<GetCustomer.Query>(GET_CUSTOMER);
        if (!activeCustomer) {
            return null;
        }
        if (!activeCustomer.addresses) {
            return {
                items: [],
            };
        }
        const items = activeCustomer.addresses.map(a => vendureAddressToFalcon(a));
        return { items };
    }

    async address(obj: any, args: AddressQueryArgs): Promise<Address | null> {
        const addresses = await this.addresses();
        if (!addresses) {
            return null;
        }
        return addresses.items.find(a => !!(a && (a.id === args.id))) || null;
    }

    async editAddress(obj: any, args: EditAddressMutationArgs): Promise<Address | null> {
        const { input } = args;
        const { updateCustomerAddress } = await this.query<UpdateAddress.Mutation, UpdateAddress.Variables>(UPDATE_ADDRESS, {
            input: {
                id: input.id.toString(),
                company: input.company,
                countryCode: input.countryId,
                defaultShippingAddress: input.defaultShipping,
                defaultBillingAddress: input.defaultBilling,
                fullName: `${input.firstname} ${input.lastname}`,
                postalCode: input.postcode,
                streetLine1: input.street ? input.street[0] : null,
                streetLine2: input.street ? input.street[1] : null,
                phoneNumber: input.telephone,
            },
        });
        return vendureAddressToFalcon(updateCustomerAddress);
    }

    async addAddress(obj: any, args: AddAddressMutationArgs): Promise<Address | null> {
        const { input } = args;
        const { createCustomerAddress } = await this.query<CreateAddress.Mutation, CreateAddress.Variables>(CREATE_ADDRESS, {
            input: {
                company: input.company,
                countryCode: input.countryId,
                defaultShippingAddress: input.defaultShipping,
                defaultBillingAddress: input.defaultBilling,
                fullName: `${input.firstname} ${input.lastname}`,
                postalCode: input.postcode,
                streetLine1: input.street && input.street[0] || '',
                streetLine2: input.street ? input.street[1] : null,
                phoneNumber: input.telephone,
            },
        });
        return vendureAddressToFalcon(createCustomerAddress);
    }

    async removeCustomerAddress(obj: any, args: RemoveCustomerAddressMutationArgs): Promise<boolean> {
        const { id } = args;
        const { deleteCustomerAddress } = await this.query<DeleteAddress.Mutation, DeleteAddress.Variables>(DELETE_ADDRESS, {
            id: id.toString(),
        });
        return deleteCustomerAddress;
    }

    async editCustomer(obj: any, args: EditCustomerMutationArgs): Promise<Customer | null> {
        const { input } = args;
        const result = await this.query<UpdateCustomer.Mutation, UpdateCustomer.Variables>(UPDATE_CUSTOMER, {
            input: {
                firstName: input.firstname,
                lastName: input.lastname,
                emailAddress: input.email,
            },
        });
        return {
            id: +result.updateCustomer.id,
        };
    }

    async changeCustomerPassword(obj: any, args: ChangeCustomerPasswordMutationArgs): Promise<boolean> {
        const { input } = args;
        const { updateCustomerPassword } = await this.query<UpdatePassword.Mutation, UpdatePassword.Variables>(UPDATE_PASSWORD, {
            current: input.currentPassword,
            new: input.password,
        });
        return updateCustomerPassword || false;
    }

    async requestCustomerPasswordResetToken(obj: any, args: RequestCustomerPasswordResetTokenMutationArgs): Promise<Maybe<boolean>> {
        const { input } = args;
        const { requestPasswordReset } = await this.query<RequestPasswordReset.Mutation, RequestPasswordReset.Variables>(REQUEST_PASSWORD_RESET, {
            emailAddress: input.email,
        });
        return requestPasswordReset;
    }

    async validatePasswordToken(obj: any, args: ValidatePasswordTokenQueryArgs): Promise<Maybe<boolean>> {
        const { token } = args;
        const { resetPassword } = await this.query<ResetPassword.Mutation, ResetPassword.Variables>(RESET_PASSWORD, {
            token,
            password: PASSWORD_RESET_TEMP_PASSWORD,
        });
        return !!resetPassword;
    }

    async resetCustomerPassword(obj: any, args: ResetCustomerPasswordMutationArgs): Promise<Maybe<boolean>> {
        const { input } = args;
        const { updateCustomerPassword } = await this.query<UpdatePassword.Mutation, UpdatePassword.Variables>(UPDATE_PASSWORD, {
            current: PASSWORD_RESET_TEMP_PASSWORD,
            new: input.password,
        });
        return updateCustomerPassword || false;
    }

    /**
     * Transitions the state of the Vendure order to the given state.
     */
    private async transitionOrderToState(state: string): Promise<TransitionOrderToState.Mutation> {
        const nextStates = (await this.query<GetNextStates.Query>(GET_ORDER_NEXT_STATES)).nextOrderStates;
        if (!nextStates.includes(state)) {
            throw new Error(`Order cannot be transitioned to the state "${state}"`);
        }
        return this.query<TransitionOrderToState.Mutation, TransitionOrderToState.Variables>(TRANSITION_ORDER_STATE, {
            state,
        });
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
    private getOrderLineFor(itemId: number): FullOrder.Lines {
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

    private throwNotImplementedError(resolverName: string): never {
        throw new Error(`[vendure-api-provider] ${resolverName} is not yet implemented.`);
    }
};
