// tslint:disable
export type Maybe<T> = T | null;

/** Pagination input (it's used for querying paginated data) */
export interface PaginationInput {
  /** Current page */
  page?: Maybe<number>;
  /** Limit items per page */
  perPage?: Maybe<number>;
}
/** Sort order input (it's being used to sort the requested data on the backend) */
export interface SortOrderInput {
  /** Perform sorting by this field */
  field: string;
  /** Sort order direction */
  direction?: Maybe<SortOrderDirection>;
}

export interface FilterInput {
  field?: Maybe<string>;

  value?: Maybe<(Maybe<string>)[]>;

  operator?: Maybe<FilterOperator>;
}

export interface ShopPageQuery {
  /** simple list of field to get aggregated result count */
  aggregations?: Maybe<(Maybe<string>)[]>;

  perPage?: Maybe<number>;

  page?: Maybe<number>;
}

export interface AddToCartInput {
  sku: string;

  qty: number;

  configurableOptions?: Maybe<(Maybe<ConfigurableOptionInput>)[]>;

  bundleOptions?: Maybe<(Maybe<BundleOptionInput>)[]>;
}

export interface ConfigurableOptionInput {
  optionId: number;

  value: number;
}

export interface BundleOptionInput {
  optionId: number;

  optionQty: number;

  optionSelections?: Maybe<(Maybe<number>)[]>;
}

export interface UpdateCartItemInput {
  itemId: number;
  /** Magento 2 legacy both itemId and sku need to be provided for rest endpoint to work */
  sku: string;

  qty: number;
}

export interface RemoveCartItemInput {
  itemId: number;
}

export interface CouponInput {
  couponCode: string;
}

export interface SignUp {
  email?: Maybe<string>;

  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  password?: Maybe<string>;

  address?: Maybe<AddressInput>;

  autoSignIn?: Maybe<boolean>;
}

export interface AddressInput {
  id?: Maybe<number>;
  /** legacy from Magento 2 for placeOrder billingAddress input field */
  terms?: Maybe<boolean>;

  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  city?: Maybe<string>;

  customerId?: Maybe<number>;

  customerAddressId?: Maybe<number>;

  postcode?: Maybe<string>;

  sameAsBilling?: Maybe<number>;

  saveInAddressBook?: Maybe<number>;

  email?: Maybe<string>;

  company?: Maybe<string>;

  countryId?: Maybe<string>;

  defaultBilling?: Maybe<boolean>;

  defaultShipping?: Maybe<boolean>;

  region?: Maybe<string>;

  regionId?: Maybe<number>;

  street?: Maybe<(Maybe<string>)[]>;

  telephone?: Maybe<string>;
}

export interface SignIn {
  email?: Maybe<string>;

  password?: Maybe<string>;
}

export interface CustomerInput {
  websiteId: number;

  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  email?: Maybe<string>;

  defaultBilling?: Maybe<string>;

  defaultShipping?: Maybe<string>;
}

export interface EditAddressInput {
  id: number;

  company?: Maybe<string>;

  firstname: string;

  lastname: string;

  telephone?: Maybe<string>;

  street?: Maybe<(Maybe<string>)[]>;

  postcode: string;

  city: string;

  countryId: string;

  defaultBilling?: Maybe<boolean>;

  defaultShipping?: Maybe<boolean>;

  regionId?: Maybe<number>;
}

export interface AddAddressInput {
  company?: Maybe<string>;

  firstname: string;

  lastname: string;

  telephone: string;

  street?: Maybe<(Maybe<string>)[]>;

  postcode: string;

  city: string;

  countryId: string;

  defaultBilling?: Maybe<boolean>;

  defaultShipping?: Maybe<boolean>;

  regionId?: Maybe<number>;
}

export interface EstimateShippingInput {
  address?: Maybe<AddressInput>;
}

export interface EmailInput {
  email: string;
}

export interface CustomerPassword {
  currentPassword: string;

  password: string;
}

export interface CustomerPasswordReset {
  resetToken: string;

  password: string;
}

export interface ShippingInput {
  billingAddress?: Maybe<AddressInput>;

  shippingAddress?: Maybe<AddressInput>;

  shippingCarrierCode?: Maybe<string>;

  shippingMethodCode?: Maybe<string>;
}

export interface PlaceOrderInput {
  billingAddress?: Maybe<AddressInput>;

  email?: Maybe<string>;

  paymentMethod?: Maybe<PaymentMethodInput>;
}

export interface PaymentMethodInput {
  method?: Maybe<string>;
  /** Selected payment-specific payload (like encrypted credit card info) */
  additionalData?: Maybe<Json>;
}
/** Sort order direction enumeration, defines direction of sorting */
export enum SortOrderDirection {
  asc = "asc",
  desc = "desc"
}

export enum FilterOperator {
  eq = "eq",
  neq = "neq",
  lt = "lt",
  lte = "lte",
  gt = "gt",
  gte = "gte",
  in = "in",
  nin = "nin",
  range = "range"
}

export enum AggregationType {
  single = "single",
  multiple = "multiple",
  range = "range"
}

export type Json = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  /** Returns a compiled backend config */
  backendConfig?: Maybe<BackendConfig>;
  /** URL-resolve query */
  url?: Maybe<Url>;

  menu?: Maybe<(Maybe<MenuItem>)[]>;

  category?: Maybe<Category>;

  product?: Maybe<Product>;

  products?: Maybe<ProductList>;

  cart?: Maybe<Cart>;

  countries?: Maybe<CountryList>;

  order?: Maybe<Order>;

  lastOrder?: Maybe<Order>;

  orders?: Maybe<Orders>;

  address?: Maybe<Address>;

  addresses?: Maybe<AddressList>;

  customer?: Maybe<Customer>;

  cmsPage?: Maybe<CmsPage>;

  cmsBlock?: Maybe<CmsBlock>;

  validatePasswordToken?: Maybe<boolean>;
}

/** Returns a compiled config object for all supported backends */
export interface BackendConfig {
  /** List of supported locales (for example: `["en-US", "nl-NL"]`) */
  locales?: Maybe<(Maybe<string>)[]>;
  /** Current active locale (for example, `en-US`) */
  activeLocale?: Maybe<string>;

  shop?: Maybe<ShopConfig>;
}

export interface ShopConfig {
  activeCurrency?: Maybe<string>;

  activeStore?: Maybe<string>;

  currencies?: Maybe<(Maybe<string>)[]>;

  baseCurrency?: Maybe<string>;

  stores?: Maybe<(Maybe<ShopStoreEntry>)[]>;

  timezone?: Maybe<string>;

  weightUnit?: Maybe<string>;
}

export interface ShopStoreEntry {
  name?: Maybe<string>;

  code?: Maybe<string>;
}

/** Dynamic URL type */
export interface Url {
  /** Entity ID */
  id: string;
  /** Canonical URL for the found entity */
  path: string;
  /** Entity type (this is being used by Dynamic Routing) */
  type: string;
  /** Redirect flag if the given URL must be redirected to the specified "path" URL */
  redirect?: Maybe<boolean>;
}

export interface MenuItem {
  id: string;

  name: string;

  urlPath: string;

  cssClass?: Maybe<string>;

  children: (Maybe<MenuItem>)[];
}

export interface Category {
  id?: Maybe<string>;

  name?: Maybe<string>;

  children?: Maybe<(Maybe<Category>)[]>;

  description?: Maybe<string>;

  breadcrumbs?: Maybe<(Maybe<Breadcrumb>)[]>;

  products?: Maybe<ProductList>;
}

export interface Breadcrumb {
  name?: Maybe<string>;

  urlPath?: Maybe<string>;
}

export interface ProductList {
  items: (Maybe<Product>)[];

  aggregations?: Maybe<(Maybe<Aggregation>)[]>;

  pagination?: Maybe<Pagination>;
}

export interface Product {
  id?: Maybe<string>;

  sku: string;

  name: string;

  image?: Maybe<string>;

  urlPath: string;
  /** Full url to resized product image */
  thumbnail?: Maybe<string>;

  priceType?: Maybe<string>;

  price?: Maybe<string>;

  minPrice?: Maybe<string>;

  maxPrice?: Maybe<string>;

  currency?: Maybe<string>;

  description?: Maybe<string>;

  stock?: Maybe<Stock>;

  type?: Maybe<string>;

  configurableOptions?: Maybe<(Maybe<ConfigurableProductOption>)[]>;

  bundleOptions?: Maybe<(Maybe<BundleProductOption>)[]>;

  gallery?: Maybe<(Maybe<GalleryEntry>)[]>;

  breadcrumbs?: Maybe<(Maybe<Breadcrumb>)[]>;

  seo?: Maybe<ProductSeo>;
}

export interface Stock {
  isInStock?: Maybe<boolean>;

  qty: number;
}

export interface ConfigurableProductOption {
  id?: Maybe<string>;

  attributeId?: Maybe<string>;

  label?: Maybe<string>;

  position?: Maybe<string>;

  productId?: Maybe<string>;

  values?: Maybe<(Maybe<ConfigurableProductOptionValue>)[]>;
}

export interface ConfigurableProductOptionValue {
  inStock?: Maybe<(Maybe<string>)[]>;

  label?: Maybe<string>;

  valueIndex?: Maybe<string>;
}

export interface BundleProductOption {
  optionId?: Maybe<number>;

  position?: Maybe<number>;

  productLinks?: Maybe<(Maybe<BundleProductOptionLink>)[]>;

  required?: Maybe<boolean>;

  sku?: Maybe<string>;

  title?: Maybe<string>;

  type?: Maybe<string>;
}

export interface BundleProductOptionLink {
  canChangeQuantity?: Maybe<number>;

  name?: Maybe<string>;

  catalogDisplayPrice?: Maybe<string>;

  id?: Maybe<string>;

  isDefault?: Maybe<boolean>;

  optionId?: Maybe<number>;

  position?: Maybe<number>;

  price?: Maybe<string>;

  priceType?: Maybe<string>;

  qty?: Maybe<number>;

  sku?: Maybe<string>;
}

export interface GalleryEntry {
  type: string;

  full: string;

  thumbnail?: Maybe<string>;

  embedUrl?: Maybe<string>;
}

export interface ProductSeo {
  title?: Maybe<string>;

  description?: Maybe<string>;

  keywords?: Maybe<string>;
}

export interface Aggregation {
  /** field name to aggregate values on */
  field?: Maybe<string>;
  /** Agregation type */
  type?: Maybe<AggregationType>;
  /** Aggregated items */
  buckets?: Maybe<(Maybe<AggregationBucket>)[]>;
  /** Title */
  title?: Maybe<string>;
}

export interface AggregationBucket {
  /** Discriminator value */
  value?: Maybe<string>;
  /** Items count */
  count?: Maybe<number>;
  /** Title */
  title?: Maybe<string>;
}

/** Pagination type (used for listing the response data) */
export interface Pagination {
  /** Total number of pages ("totalItems"/"perPage") */
  totalPages: number;
  /** Total number of items of the request */
  totalItems: number;
  /** Number items per page */
  perPage: number;
  /** Current page index */
  currentPage: number;
  /** Next page index (unless "currentPage" != "totalPages") */
  nextPage?: Maybe<number>;
  /** Previous page index (unless "currentPage" != 1) */
  prevPage?: Maybe<number>;
}

export interface Cart {
  active?: Maybe<boolean>;
  /** State wheather products will be shipped or not */
  virtual?: Maybe<boolean>;

  items?: Maybe<(Maybe<CartItem>)[]>;

  itemsCount?: Maybe<number>;

  itemsQty?: Maybe<number>;

  totals?: Maybe<(Maybe<CartTotal>)[]>;

  quoteCurrency?: Maybe<string>;

  couponCode?: Maybe<string>;

  billingAddress?: Maybe<Address>;
}

export interface CartItem {
  itemId: number;

  sku: string;

  qty: number;

  name?: Maybe<string>;

  availableQty?: Maybe<number>;

  price?: Maybe<number>;

  productType?: Maybe<string>;

  priceInclTax?: Maybe<number>;

  rowTotal?: Maybe<number>;

  rowTotalInclTax?: Maybe<number>;

  rowTotalWithDiscount?: Maybe<number>;

  taxAmount?: Maybe<number>;

  taxPercent?: Maybe<number>;

  discountAmount?: Maybe<number>;

  discountPercent?: Maybe<number>;

  weeeTaxAmount?: Maybe<number>;

  weeeTaxApplied?: Maybe<boolean>;

  thumbnailUrl?: Maybe<string>;

  urlKey?: Maybe<string>;

  link?: Maybe<string>;

  itemOptions?: Maybe<(Maybe<CartItemOption>)[]>;
}

export interface CartItemOption {
  label?: Maybe<string>;

  value?: Maybe<string>;

  data?: Maybe<(Maybe<CartItemOptionValue>)[]>;
}

export interface CartItemOptionValue {
  qty?: Maybe<string>;

  name?: Maybe<string>;

  price?: Maybe<string>;
}

export interface CartTotal {
  code: string;

  title?: Maybe<string>;

  value?: Maybe<number>;
}

export interface Address {
  id: number;

  company?: Maybe<string>;

  firstname: string;

  lastname: string;

  street: (Maybe<string>)[];

  city: string;

  postcode: string;

  countryId: string;

  region?: Maybe<string>;

  regionId?: Maybe<number>;

  telephone?: Maybe<string>;

  fax?: Maybe<string>;

  defaultBilling: boolean;

  defaultShipping: boolean;
}

export interface CountryList {
  items?: Maybe<(Maybe<Country>)[]>;
}

export interface Country {
  englishName?: Maybe<string>;

  localName?: Maybe<string>;

  code: string;

  regions?: Maybe<(Maybe<Region>)[]>;
}

export interface Region {
  id?: Maybe<number>;

  name?: Maybe<string>;

  code: string;
}

export interface Order {
  incrementId: string;

  entityId?: Maybe<number>;

  createdAt?: Maybe<string>;

  customerFirstname?: Maybe<string>;

  customerLastname?: Maybe<string>;

  status?: Maybe<string>;

  orderCurrencyCode?: Maybe<string>;

  baseGrandTotal?: Maybe<string>;

  subtotal?: Maybe<string>;

  shippingAmount?: Maybe<string>;

  taxAmount?: Maybe<string>;

  discountAmount?: Maybe<string>;

  grandTotal?: Maybe<string>;

  items?: Maybe<(Maybe<OrderItem>)[]>;

  shippingDescription?: Maybe<string>;

  paymentMethodName?: Maybe<string>;

  shippingAddress?: Maybe<Address>;

  billingAddress?: Maybe<Address>;

  couponCode?: Maybe<string>;
}

export interface OrderItem {
  itemId: number;

  sku: string;

  qty: number;

  name?: Maybe<string>;

  availableQty?: Maybe<number>;

  price?: Maybe<number>;

  productType?: Maybe<string>;

  rowTotalInclTax?: Maybe<number>;

  basePrice?: Maybe<number>;

  basePriceInclTax?: Maybe<number>;

  thumbnailUrl?: Maybe<string>;

  urlKey?: Maybe<string>;

  link?: Maybe<string>;

  parentItem?: Maybe<OrderItem>;
}

export interface Orders {
  items: (Maybe<Order>)[];

  pagination?: Maybe<Pagination>;
}

export interface AddressList {
  items: (Maybe<Address>)[];
}

export interface Customer {
  id?: Maybe<number>;

  websiteId?: Maybe<number>;

  addresses?: Maybe<(Maybe<Address>)[]>;

  defaultBilling?: Maybe<string>;

  defaultShipping?: Maybe<string>;

  email?: Maybe<string>;

  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  newsletterSubscriber?: Maybe<boolean>;
}

export interface CmsPage {
  id?: Maybe<string>;

  title?: Maybe<string>;

  content?: Maybe<string>;
}

export interface CmsBlock {
  id?: Maybe<string>;

  title?: Maybe<string>;

  content?: Maybe<string>;

  active?: Maybe<boolean>;
}

export interface Mutation {
  /** Sets the locale (for example, "en-US") */
  setLocale?: Maybe<BackendConfig>;

  setShopCurrency?: Maybe<BackendConfig>;

  setShopStore?: Maybe<BackendConfig>;

  addToCart?: Maybe<CartItemPayload>;

  updateCartItem?: Maybe<CartItemPayload>;

  removeCartItem?: Maybe<RemoveCartItemResponse>;

  applyCoupon?: Maybe<boolean>;

  cancelCoupon?: Maybe<boolean>;

  signUp?: Maybe<boolean>;

  signIn?: Maybe<boolean>;

  signOut?: Maybe<boolean>;

  editCustomer?: Maybe<Customer>;

  editAddress?: Maybe<Address>;

  addAddress?: Maybe<Address>;

  estimateShippingMethods?: Maybe<(Maybe<ShippingMethod>)[]>;

  removeCustomerAddress?: Maybe<boolean>;

  requestCustomerPasswordResetToken?: Maybe<boolean>;

  changeCustomerPassword?: Maybe<boolean>;

  resetCustomerPassword?: Maybe<boolean>;
  /** set current customer order shipping information */
  setShipping?: Maybe<ShippingInformation>;

  placeOrder?: Maybe<PlaceOrderResult>;
}

export interface CartItemPayload {
  itemId: number;

  sku?: Maybe<string>;

  qty?: Maybe<number>;

  name?: Maybe<string>;

  price?: Maybe<number>;

  productType?: Maybe<string>;
}

export interface RemoveCartItemResponse {
  itemId?: Maybe<number>;
}

export interface ShippingMethod {
  carrierTitle?: Maybe<string>;

  amount?: Maybe<number>;

  carrierCode?: Maybe<string>;

  methodCode?: Maybe<string>;

  methodTitle?: Maybe<string>;

  priceExclTax?: Maybe<number>;

  priceInclTax?: Maybe<number>;

  currency?: Maybe<string>;
}

export interface ShippingInformation {
  paymentMethods?: Maybe<(Maybe<PaymentMethod>)[]>;

  totals?: Maybe<(Maybe<CartTotal>)[]>;
}

export interface PaymentMethod {
  /** Internal Payment method code (like "paypal_express") */
  code?: Maybe<string>;
  /** Translated Payment method title (like "PayPal Express Checkout") */
  title?: Maybe<string>;
  /** Configuration object for the specific Payment method */
  config?: Maybe<Json>;
}

/** Successful placeOrder result */
export interface PlaceOrderSuccessfulResult {
  /** Increment order id */
  orderId?: Maybe<string>;
  /** like 0000001 - used for reference by customer */
  orderRealId?: Maybe<string>;
}

/** 3D-secure placeOrder result */
export interface PlaceOrder3dSecureResult {
  /** Issuer URL (target URL) for redirection */
  url: string;
  /** HTTP method (GET or POST) */
  method?: Maybe<string>;
  /** List of fields to pass to the issuer page */
  fields?: Maybe<(Maybe<PlaceOrder3dSecureField>)[]>;
}

export interface PlaceOrder3dSecureField {
  name: string;

  value?: Maybe<string>;
}

export interface Subscription {
  /** Temporary placeholder field */
  _?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface UrlQueryArgs {
  path: string;
}
export interface CategoryQueryArgs {
  id: string;
}
export interface ProductQueryArgs {
  id: string;
}
export interface ProductsQueryArgs {
  categoryId?: Maybe<string>;

  includeSubcategories?: Maybe<boolean>;

  query?: Maybe<ShopPageQuery>;

  sortOrders?: Maybe<(Maybe<SortOrderInput>)[]>;

  filters?: Maybe<(Maybe<FilterInput>)[]>;

  skus?: Maybe<(Maybe<string>)[]>;
}
export interface OrderQueryArgs {
  id: number;
}
export interface OrdersQueryArgs {
  pagination?: Maybe<PaginationInput>;
}
export interface AddressQueryArgs {
  id: number;
}
export interface CmsPageQueryArgs {
  id?: Maybe<number>;

  identifier?: Maybe<string>;
}
export interface CmsBlockQueryArgs {
  identifier?: Maybe<string>;
}
export interface ValidatePasswordTokenQueryArgs {
  token: string;
}
export interface BreadcrumbsCategoryArgs {
  path: string;
}
export interface ProductsCategoryArgs {
  pagination?: Maybe<PaginationInput>;

  sort?: Maybe<SortOrderInput>;

  filters?: Maybe<(Maybe<FilterInput>)[]>;
}
export interface BreadcrumbsProductArgs {
  path: string;
}
export interface SetLocaleMutationArgs {
  locale: string;
}
export interface SetShopCurrencyMutationArgs {
  currency: string;
}
export interface SetShopStoreMutationArgs {
  storeCode: string;
}
export interface AddToCartMutationArgs {
  input: AddToCartInput;
}
export interface UpdateCartItemMutationArgs {
  input: UpdateCartItemInput;
}
export interface RemoveCartItemMutationArgs {
  input: RemoveCartItemInput;
}
export interface ApplyCouponMutationArgs {
  input: CouponInput;
}
export interface SignUpMutationArgs {
  input: SignUp;
}
export interface SignInMutationArgs {
  input: SignIn;
}
export interface EditCustomerMutationArgs {
  input: CustomerInput;
}
export interface EditAddressMutationArgs {
  input: EditAddressInput;
}
export interface AddAddressMutationArgs {
  input: AddAddressInput;
}
export interface EstimateShippingMethodsMutationArgs {
  input: EstimateShippingInput;
}
export interface RemoveCustomerAddressMutationArgs {
  id: number;
}
export interface RequestCustomerPasswordResetTokenMutationArgs {
  input: EmailInput;
}
export interface ChangeCustomerPasswordMutationArgs {
  input: CustomerPassword;
}
export interface ResetCustomerPasswordMutationArgs {
  input: CustomerPasswordReset;
}
export interface SetShippingMutationArgs {
  input?: Maybe<ShippingInput>;
}
export interface PlaceOrderMutationArgs {
  input: PlaceOrderInput;
}

// ====================================================
// Unions
// ====================================================

/** Mixed result for "Mutation.placeOrder" for */
export type PlaceOrderResult =
  | PlaceOrderSuccessfulResult
  | PlaceOrder3dSecureResult;
