import { AddressInput, Cart, CartItemPayload, CartTotal, Product, ShippingMethod } from './generated/falcon-types';
import {
    CreateAddressInput,
    GetActiveOrder,
    GetShippingMethods,
    PartialOrder,
    ProductWithVariants,
    SearchProducts,
} from './generated/vendure-types';

/**
 * Translates a Vendure Product entity into a shape compatible with the Falcon Product
 * entity.
 */
export function vendureProductToProduct(vendureProduct: ProductWithVariants.Fragment): Product {
    const { id, name, description, featuredAsset } = vendureProduct;
    return {
        id,
        sku: vendureProduct.variants[0].sku,
        name,
        image: featuredAsset && featuredAsset.preview,
        urlPath: formatProductUrl(vendureProduct.id, vendureProduct.slug),
        thumbnail: featuredAsset ? featuredAsset.preview + '?w=300&h=300&mode=crop' : null,
        priceType: 'priceType',
        price: formatPrice(vendureProduct.variants[0].price, 'string'),
        minPrice: formatPrice(vendureProduct.variants[0].price, 'string'),
        maxPrice: formatPrice(vendureProduct.variants[0].price, 'string'),
        currency: vendureProduct.variants[0].currencyCode,
        description,
        stock: {
            isInStock: true,
            qty: 100,
        },
        type: 'type',
        configurableOptions: vendureProduct.optionGroups.map(og => {
            return {
                id: og.id,
                attributeId: og.code,
                label: og.name,
                position: 'position',
                productId: vendureProduct.id,
                values: og.options.map(o => {
                    return {
                        inStock: [],
                        label: o.name,
                        valueIndex: 'valueIndex',
                    };
                }),
            };
        }),
        bundleOptions: [],
        gallery: vendureProduct.assets.map(a => {
            return {
                type: a.type,
                full: a.preview,
                thumbnail: a.preview  + '?preset=mid',
                embedUrl: 'embedurl',
            };
        }),
        breadcrumbs: [],
        seo: {
            title: vendureProduct.name,
            description: vendureProduct.description,
            keywords: '',
        },
    };
}

export function searchResultToProduct(searchResult: SearchProducts.Items): Product {
    return {
        sku: searchResult.sku,
        id: searchResult.productId,
        name: searchResult.productName,
        price: formatPrice(searchResult.price, 'string'),
        thumbnail: searchResult.productPreview + '?w=300&h=300&mode=crop',
        urlPath: formatProductUrl(searchResult.productId, searchResult.slug),
    };
}

/**
 * Convers a Vendure Order to the Falcon Cart type.
 */
export function orderToCart(order: GetActiveOrder.ActiveOrder): Cart {
    return {
        active: order.active,
        virtual: false,
        items: order.lines.map(line => {
            return {
                itemId: +line.productVariant.id,
                sku: line.productVariant.sku,
                qty: line.quantity,
                name: line.productVariant.name,
                price: formatPrice(line.unitPriceWithTax, 'number'),
                rowTotalInclTax: formatPrice(line.totalPrice, 'number'),
                thumbnailUrl: line.featuredAsset && line.featuredAsset.preview + '?preset=thumb',
                itemOptions: line.productVariant.options.map(o => ({ value: o.name })),
            };
        }),
        itemsQty: order.lines.reduce((qty, l) => qty + l.quantity, 0),
        totals: orderToTotals(order),
        quoteCurrency: order.currencyCode,
        couponCode: '',
        billingAddress: null,
    };
}

/**
 * Extracts the order totals into an array of Falcon CartTotal objects.
 */
export function orderToTotals(order: {
    subTotal: number;
    shipping: number;
    totalBeforeTax: number;
    total: number;
}): CartTotal[] {
    return [
        {  code: 'subtotal', title: 'Subtotal', value: formatPrice(order.subTotal, 'number') },
        {  code: 'shipping', title: 'Shipping & Handling', value: formatPrice(order.shipping, 'number') },
        {  code: 'tax', title: 'Tax', value: formatPrice(order.total - order.totalBeforeTax, 'number') },
        {  code: 'grand_total', title: 'Grand Total', value: formatPrice(order.total, 'number') },
    ];
}

/**
 * Adding & adjusting and order in Vendure returns the entire cart, whereas Falcon expects just the added /
 * adjusted row.
 */
export function partialOrderToCartItem(order: PartialOrder.Fragment, variantId: string): CartItemPayload {
    const { lines } = order;
    const addedLine = lines.find(l => l.productVariant.id === variantId);
    if (!addedLine) {
        throw new Error(`Could not find the corresponding OrderLine for the variant id "${variantId}"`);
    }
    return {
        name: addedLine.productVariant.name,
        price: addedLine.unitPriceWithTax,
        itemId: +addedLine.productVariant.id,
        qty: addedLine.quantity,
        sku: addedLine.productVariant.sku,
        productType: '',
    };
}

/**
 * Converts a Vendure ShippingMethodQuote to a Falcon ShippingMethod.
 */
export function shippingQuoteToShippingMethod(quote: GetShippingMethods.EligibleShippingMethods): ShippingMethod {
    return {
        carrierTitle: quote.description,
        amount: formatPrice(quote.price, 'number'),
        carrierCode: quote.id,
        methodCode: quote.id,
        methodTitle: quote.description,
        priceExclTax: formatPrice(quote.price, 'number'),
        priceInclTax: formatPrice(quote.price, 'number'),
    };
}

/**
 * Convert a Falcon AddressInput object into the format expected by Vendure.
 */
export function falconAddressInputToVendure(input: AddressInput): CreateAddressInput {
    return {
        fullName: `${input.firstname} ${input.lastname}`,
        streetLine1: input.street ? (input.street[0] || '') : '',
        streetLine2: input.street ? input.street[1] : '',
        city: input.city,
        countryCode: input.countryId || '',
        postalCode: input.postcode,
        phoneNumber: input.telephone,
    };
}

function formatProductUrl(id: string, slug: string): string {
    return `/product/${id}-${slug}`;
}

/**
 * Vendure stores all price as cent integers, whereas Falcon wants them as a string decimal.
 * For some reason, the Falcon schema sometimes has prices as strings and sometimes as numbers,
 * hence the "format" parameter.
 */
function formatPrice(priceInCents: number, format: 'string'): string;
function formatPrice(priceInCents: number, format: 'number'): number;
function formatPrice(priceInCents: number, format: 'string' | 'number'): string | number {
    const divided = priceInCents / 100;
    return format === 'string' ? divided.toString(10) : divided;
}
