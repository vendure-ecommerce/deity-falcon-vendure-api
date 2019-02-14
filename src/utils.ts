import { Product } from './generated/falcon-types';
import { ProductWithVariants, SearchProducts } from './generated/vendure-types';

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
        price: formatPrice(vendureProduct.variants[0].price),
        minPrice: formatPrice(vendureProduct.variants[0].price),
        maxPrice: formatPrice(vendureProduct.variants[0].price),
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
        price: formatPrice(searchResult.price),
        thumbnail: searchResult.productPreview + '?w=300&h=300&mode=crop',
        urlPath: formatProductUrl(searchResult.productId, searchResult.slug),
    };
}

function formatProductUrl(id: string, slug: string): string {
    return `/product/${id}-${slug}`;
}

/**
 * Vendure stores all price as cent integers, whereas Falcon wants them as a string decimal.
 */
function formatPrice(priceInCents: number): string {
    return (priceInCents / 100).toString(10);
}