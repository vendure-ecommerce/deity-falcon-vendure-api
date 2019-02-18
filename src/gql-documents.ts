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

export const ACTIVE_ORDER = gql`
    query GetActiveOrder {
        activeOrder {
            active
            subTotal
            shipping
            totalBeforeTax
            currencyCode
            total
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
                company
                fullName
                streetLine1
                city
                postalCode
                countryCode
                province
                phoneNumber
            }
        }
    }
`;
