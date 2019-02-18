import gql from 'graphql-tag';

// language="GraphQL"
export const PRODUCT_FRAGMENT = gql`
    fragment ProductWithVariants on Product {
        id
        name
        slug
        description
        assets {
            id
            type
            preview
        }
        facetValues {
            name
        }
        featuredAsset {
            preview
        }
        optionGroups {
            id
            code
            name
            options {
                name
            }
        }
        variants {
            id
            name
            sku
            facetValues {
                name
            }
            price
            currencyCode
        }
    }
`;

export const GET_PRODUCTS_LIST = gql`
    query GetProductsList($options: ProductListOptions) {
        products(languageCode: en, options: $options) {
            items {
                ...ProductWithVariants
            }
            totalItems
        }
    }
${PRODUCT_FRAGMENT}`;

export const GET_PRODUCT = gql`
    query GetProduct($id: ID!) {
        product(languageCode: en, id: $id) {
            ...ProductWithVariants
        }
    }
${PRODUCT_FRAGMENT}`;

export const GET_ALL_CATEGORIES = gql`
    query GetCategoriesList($options: ProductCategoryListOptions) {
        productCategories(options: $options) {
            items {
                id
                name
                children {
                    id
                    name
                }
                description
                ancestorFacetValues {
                    id
                    name
                }
                facetValues {
                    id
                    name
                }
                parent {
                    id
                    name
                }
            }
            totalItems
        }
    }
`;

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            items {
                productId
                description
                productPreview
                sku
                slug
                price
                currencyCode
                productName
            }
            totalItems
        }
    }
`;

export const PARTIAL_ORDER_FRAGMENT = gql`
    fragment PartialOrder on Order {
        id
        active
        code
        lines {
            productVariant {
                id
                sku
                name
            }
            unitPriceWithTax
            quantity
        }
    }
`;

export const ADD_TO_ORDER = gql`
    mutation AddToOrder($id: ID!, $qty: Int!) {
        addItemToOrder(productVariantId: $id, quantity: $qty) {
            ...PartialOrder
        }
    }
    ${PARTIAL_ORDER_FRAGMENT}
`;

export const ADJUST_ITEM_QTY = gql`
    mutation AdjustItemQty($id: ID!, $qty: Int!) {
        adjustItemQuantity(orderItemId: $id, quantity: $qty) {
            ...PartialOrder
        }
    }
    ${PARTIAL_ORDER_FRAGMENT}
`;

export const REMOVE_ITEM = gql`
    mutation RemoveItem($id: ID!) {
        removeItemFromOrder(orderItemId: $id) {
            ...PartialOrder
        }
    }
    ${PARTIAL_ORDER_FRAGMENT}
`;

export const ORDER_ADDRESS_FRAGMENT = gql`
    fragment OrderAddress on OrderAddress {
        company
        fullName
        streetLine1
        streetLine2
        city
        postalCode
        countryCode
        province
        phoneNumber
    }
`;

export const FULL_ORDER_FRAGMENT = gql`
    fragment FullOrder on Order {
        createdAt
        id
        code
        state
        active
        subTotal
        shipping
        totalBeforeTax
        currencyCode
        total
        payments {
            id
            method
            amount
            transactionId
        }
        lines {
            id
            unitPriceWithTax
            totalPrice
            quantity
            featuredAsset {
                preview
            }
            productVariant {
                id
                name
                sku
                options {
                    name
                }
            }
        }
        billingAddress {
            ...OrderAddress
        }
        shippingAddress {
            ...OrderAddress
        }
        customer {
            id
            firstName
            lastName
        }
    }
    ${ORDER_ADDRESS_FRAGMENT}
`;

export const ACTIVE_ORDER = gql`
    query GetActiveOrder {
        activeOrder {
            ...FullOrder
        }
    }
    ${FULL_ORDER_FRAGMENT}
`;

export const GET_CUSTOMER = gql`
    query GetCustomer {
        activeCustomer {
            id
            firstName
            lastName
            emailAddress
            addresses {
                id
                fullName
                streetLine1
                streetLine2
                city
                province
                postalCode
                phoneNumber
                country {
                    id
                    code
                    name
                }
                defaultBillingAddress
                defaultShippingAddress
            }
        }
    }
`;

export const GET_COUNTRY_LIST = gql`
    query GetCountryList {
        availableCountries {
            id
            name
            code
        }
    }
`;

export const GET_SHIPPING_METHODS = gql`
    query GetShippingMethods {
        eligibleShippingMethods {
            id
            description
            price
        }
    }
`;

export const GET_ORDER_NEXT_STATES = gql`
    query GetNextStates {
        nextOrderStates
    }
`;

export const TRANSITION_ORDER_STATE = gql`
    mutation TransitionOrderToState($state: String!) {
        transitionOrderToState(state: $state) {
            id
            code
            state
        }
    }
`;

export const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod($addressInput: CreateAddressInput!, $shippingMethodId: ID!) {
        setOrderShippingAddress(input: $addressInput) {
            id
        }
        setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
            ...PartialOrder
            subTotal
            shipping
            totalBeforeTax
            currencyCode
            total
        }
    }
    ${PARTIAL_ORDER_FRAGMENT}
`;

export const ADD_PAYMENT_TO_ORDER = gql`
    mutation AddPaymentToOrder($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            id
            state
            code
        }
    }
`;

export const SET_CUSTOMER_FOR_ORDER = gql`
    mutation SetCustomerForOrder($input: CreateCustomerInput!) {
        setCustomerForOrder(input: $input) {
            id
        }
    }
`;

export const GET_ORDER_BY_CODE = gql`
    query GetOrderByCode($code: String!) {
        orderByCode(code: $code) {
            ...FullOrder
        }
    }
    ${FULL_ORDER_FRAGMENT}
`;

export const CREATE_ACCOUNT = gql`
    mutation CreateAccount($input: RegisterCustomerInput!) {
        registerCustomerAccount(input: $input)
    }
`;

export const LOG_IN = gql`
    mutation LogIn($username: String!, $password: String!) {
        login(username: $username, password: $password, rememberMe: true) {
            user {
                id
                identifier
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation LogOut {
        logout
    }
`;

export const GET_ORDERS = gql`
    query GetCustomerOrders($options: OrderListOptions) {
        activeCustomer {
            orders(options: $options) {
                items {
                    ...FullOrder
                }
                totalItems
            }
        }
    }
    ${FULL_ORDER_FRAGMENT}
`;
