import {
    Address,
    AddressInput, Aggregation, AggregationBucket, AggregationType,
    Cart,
    CartItemPayload,
    CartTotal,
    Customer, Maybe,
    MenuItem,
    Order,
    Product, ProductPrice,
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

export interface FacetWithValues {
    id: string;
    name: string;
    code: string;
    values: Array<{
        id: string;
        name: string;
        count: number;
    }>;
}

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
        price: toProductPrice(variant.price),
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
        price: toProductPrice(extractSearchResultPrice(searchResult.price)),
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

export function facetValuesToAggregations(facetValues: SearchProducts.FacetValues[], totalItems: number, facetValueIds: string[]): Aggregation[] {
    // Group FacetValues by Facet
    if (!facetValues) {
        return [];
    }
    // const activeFacetValueIds = this.activeFacetValueIds();
    const facetMap = new Map<string, FacetWithValues>();
    for (const { count, facetValue: { id, name, facet } } of facetValues) {
        if (count === totalItems && !facetValueIds.includes(id)) {
            // skip FacetValues that do not ave any effect on the
            // result set and are not active
            continue;
        }
        const facetFromMap = facetMap.get(facet.id);
        if (facetFromMap) {
            facetFromMap.values.push({ id, name, count });
        } else {
            facetMap.set(facet.id, {
                id: facet.id,
                name: facet.name,
                code: facet.code,
                values: [{ id, name, count }],
            });
        }
    }
    const facets = Array.from(facetMap.values());
    return facets.map(facet => {
        return {
          field: facet.code,
          type: null,
          buckets: facet.values.map(facetValue => ({
              value: facetValue.id,
              count: facetValue.count,
              title: facetValue.name,
          })),
          title: facet.name,
        };
    });
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
                itemId: Number(line.productVariant.id),
                sku: line.productVariant.sku,
                qty: line.quantity,
                name: line.productVariant.name,
                price: formatPrice(line.unitPriceWithTax),
                rowTotalInclTax: formatPrice(line.totalPrice),
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
        {  code: 'subtotal', title: 'Subtotal', value: formatPrice(order.subTotal) },
        {  code: 'shipping', title: 'Shipping & Handling', value: formatPrice(order.shipping) },
        {  code: 'tax', title: 'Tax', value: formatPrice(order.total - order.totalBeforeTax) },
        {  code: 'grand_total', title: 'Grand Total', value: formatPrice(order.total) },
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
        itemId: Number(addedLine.productVariant.id),
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
        amount: formatPrice(quote.price),
        carrierCode: quote.id,
        methodCode: quote.id,
        methodTitle: quote.description,
        priceExclTax: formatPrice(quote.price),
        priceInclTax: formatPrice(quote.price),
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
                itemId: Number(line.productVariant.id),
                sku: line.productVariant.sku,
                qty: line.quantity,
                name: line.productVariant.name,
                price: formatPrice(line.unitPriceWithTax),
                rowTotalInclTax: formatPrice(line.totalPrice),
                thumbnailUrl: line.featuredAsset && line.featuredAsset.preview + '?preset=thumb',
                itemOptions: line.productVariant.options.map(o => ({ value: o.name })),
            };
        }),
        couponCode: '',
        orderCurrencyCode: order.currencyCode,
        subtotal: formatPrice(order.subTotal),
        shippingAmount: formatPrice(order.shipping),
        taxAmount: formatPrice(order.total - order.totalBeforeTax),
        grandTotal: formatPrice(order.total),
        baseGrandTotal: formatPrice(order.total),
        discountAmount: 0, // TODO: which figure does this refer to in Vendure?
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
 */
function formatPrice(priceInCents: number): number {
    const divided = priceInCents / 100;
    return divided;
}

function toProductPrice(priceInCents: number): ProductPrice {
    return {
      regular: formatPrice(priceInCents),
    };
}
