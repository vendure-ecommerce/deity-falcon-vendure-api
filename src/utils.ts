import {
    Address,
    AddressInput,
    Cart,
    CartItemPayload,
    CartTotal,
    Customer,
    MenuItem,
    Order,
    Product,
    ShippingMethod,
} from './generated/falcon-types';
import {
    CreateAddressInput,
    FullOrder,
    GetActiveOrder,
    GetCollectionList,
    GetCustomer,
    GetShippingMethods,
    OrderAddress,
    PartialOrder,
    ProductWithVariants,
    SearchProducts,
} from './generated/vendure-types';
import PriceRangeInlineFragment = SearchProducts.PriceRangeInlineFragment;
import SinglePriceInlineFragment = SearchProducts.SinglePriceInlineFragment;

/**
 * Converts a Category to a Falcon MenuItem, recursily nesting children.
 */
export function categoryToMenuItem(allCategories: GetCollectionList.Items[]) {
    return (category: GetCollectionList.Items): MenuItem => ({
        id: category.id,
        name: category.name,
        children: allCategories.filter(c => c.parent && c.parent.id === category.id).map(categoryToMenuItem(allCategories)),
        urlPath: `/category/${category.id}-${category.name}`,
    });
}

/**
 * Translates a Vendure Product entity into a shape compatible with the Falcon Product
 * entity.
 */
export function vendureProductToProduct(vendureProduct: ProductWithVariants.Fragment, variantId: string): Product {
    const { id, name, description, featuredAsset, variants } = vendureProduct;
    const variant = variants.find(v => v.id === variantId);
    if (!variant) {
        throw new Error(`Could not find ProductVariant with the id "${variantId}"`);
    }
    const image = variant.featuredAsset ? variant.featuredAsset.preview : featuredAsset && featuredAsset.preview;
    return {
        id,
        sku: variant.sku,
        name: variant.name,
        image,
        urlPath: formatProductUrl(vendureProduct.id, variantId, vendureProduct.slug),
        thumbnail: featuredAsset ? featuredAsset.preview + '?w=300&h=300&mode=crop' : null,
        priceType: 'priceType',
        price: formatPrice(variant.price, 'string'),
        currency: variant.currencyCode,
        description,
        stock: {
            isInStock: true,
            qty: 100,
        },
        type: 'type',
        configurableOptions: [],
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
        id: searchResult.productVariantId,
        name: searchResult.productVariantName,
        price: formatPrice(extractSearchResultPrice(searchResult.price), 'string'),
        thumbnail: searchResult.productPreview + '?w=300&h=300&mode=crop',
        urlPath: formatProductUrl(searchResult.productId, searchResult.productVariantId, searchResult.slug),
    };
}

function extractSearchResultPrice(price: PriceRangeInlineFragment | SinglePriceInlineFragment): number {
    function isPriceRange(p: PriceRangeInlineFragment | SinglePriceInlineFragment): p is PriceRangeInlineFragment {
        return (p as any).min !== undefined;
    }
    return isPriceRange(price) ? price.min : price.value;
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

/**
 * Converts an Vendure Customer to the Falcon format.
 */
export function activeCustomerToCustomer(activeCustomer: GetCustomer.ActiveCustomer): Customer {
    return {
        id: +activeCustomer.id,
        addresses: activeCustomer.addresses && activeCustomer.addresses.map(a => vendureAddressToFalcon(a)),
        defaultBilling: 'defaultBilling',
        defaultShipping: 'defaultShipping',
        email: activeCustomer.emailAddress,
        firstname: activeCustomer.firstName,
        lastname: activeCustomer.lastName,
        websiteId: 1,
    };
}

/**
 * Coverts a Vendure Order entity to the Falcon format.
 */
export function vendureOrderToFalcon(order: FullOrder.Fragment): Order {
    const paymentMethodName = (order.payments && order.payments.length) ? order.payments[0].method : null;
    return {
        createdAt: order.createdAt,
        incrementId: order.id,
        entityId: +order.id,
        customerFirstname: order.customer && order.customer.firstName,
        customerLastname: order.customer && order.customer.lastName,
        status: order.state,
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
        couponCode: '',
        orderCurrencyCode: order.currencyCode,
        subtotal: formatPrice(order.subTotal, 'string'),
        shippingAmount: formatPrice(order.shipping, 'string'),
        taxAmount: formatPrice(order.total - order.totalBeforeTax, 'string'),
        grandTotal: formatPrice(order.total, 'string'),
        shippingAddress: order.shippingAddress ? vendureAddressToFalcon(order.shippingAddress) : null,
        billingAddress: order.shippingAddress ? vendureAddressToFalcon(order.shippingAddress) : null,
        paymentMethodName,
    };
}

/**
 * Coverts an Address from Vendure into the Falcon format.
 */
export function vendureAddressToFalcon(address: OrderAddress.Fragment | GetCustomer.Addresses): Address {
    function isOrderAddress(a: OrderAddress.Fragment | GetCustomer.Addresses): a is OrderAddress.Fragment {
        return !a.hasOwnProperty('id');
    }

    const fullName = address.fullName || '';
    const id = isOrderAddress(address) ? 0 : +address.id;
    const countryId = (isOrderAddress(address) ? address.countryCode : address.country.code) || '';

    return {
        id,
        company: address.company,
        firstname: fullName.split(' ')[0] || '',
        lastname: fullName.split(' ')[1] || '',
        street: [address.streetLine1, address.streetLine2],
        city: address.city || '',
        postcode: address.postalCode || '',
        countryId,
        region: address.province,
        telephone: address.phoneNumber,
        defaultBilling: isOrderAddress(address) ? false : address.defaultBillingAddress || false,
        defaultShipping: isOrderAddress(address) ? false : address.defaultShippingAddress || false,
    };
}

function formatProductUrl(prodId: string, variantId: string, slug: string): string {
    return `/product/${prodId}-${variantId}-${slug}`;
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
