// tslint:disable
export type Maybe<T> = T | null;

export interface OrderListOptions {
  skip?: Maybe<number>;

  take?: Maybe<number>;

  sort?: Maybe<OrderSortParameter>;

  filter?: Maybe<OrderFilterParameter>;
}

export interface OrderSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;

  state?: Maybe<SortOrder>;

  subTotalBeforeTax?: Maybe<SortOrder>;

  subTotal?: Maybe<SortOrder>;

  shipping?: Maybe<SortOrder>;

  shippingWithTax?: Maybe<SortOrder>;

  totalBeforeTax?: Maybe<SortOrder>;

  total?: Maybe<SortOrder>;
}

export interface OrderFilterParameter {
  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;

  code?: Maybe<StringOperators>;

  state?: Maybe<StringOperators>;

  active?: Maybe<BooleanOperators>;

  subTotalBeforeTax?: Maybe<NumberOperators>;

  subTotal?: Maybe<NumberOperators>;

  currencyCode?: Maybe<StringOperators>;

  shipping?: Maybe<NumberOperators>;

  shippingWithTax?: Maybe<NumberOperators>;

  totalBeforeTax?: Maybe<NumberOperators>;

  total?: Maybe<NumberOperators>;
}

export interface DateOperators {
  eq?: Maybe<DateTime>;

  before?: Maybe<DateTime>;

  after?: Maybe<DateTime>;

  between?: Maybe<DateRange>;
}

export interface DateRange {
  start: DateTime;

  end: DateTime;
}

export interface StringOperators {
  eq?: Maybe<string>;

  contains?: Maybe<string>;
}

export interface BooleanOperators {
  eq?: Maybe<boolean>;
}

export interface NumberOperators {
  eq?: Maybe<number>;

  lt?: Maybe<number>;

  lte?: Maybe<number>;

  gt?: Maybe<number>;

  gte?: Maybe<number>;

  between?: Maybe<NumberRange>;
}

export interface NumberRange {
  start: number;

  end: number;
}

export interface HistoryEntryListOptions {
  skip?: Maybe<number>;

  take?: Maybe<number>;

  sort?: Maybe<HistoryEntrySortParameter>;

  filter?: Maybe<HistoryEntryFilterParameter>;
}

export interface HistoryEntrySortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;
}

export interface HistoryEntryFilterParameter {
  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;

  isPublic?: Maybe<BooleanOperators>;

  type?: Maybe<StringOperators>;
}

export interface CollectionListOptions {
  skip?: Maybe<number>;

  take?: Maybe<number>;

  sort?: Maybe<CollectionSortParameter>;

  filter?: Maybe<CollectionFilterParameter>;
}

export interface CollectionSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  position?: Maybe<SortOrder>;

  description?: Maybe<SortOrder>;
}

export interface CollectionFilterParameter {
  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;

  languageCode?: Maybe<StringOperators>;

  name?: Maybe<StringOperators>;

  position?: Maybe<NumberOperators>;

  description?: Maybe<StringOperators>;
}

export interface ProductVariantListOptions {
  skip?: Maybe<number>;

  take?: Maybe<number>;

  sort?: Maybe<ProductVariantSortParameter>;

  filter?: Maybe<ProductVariantFilterParameter>;
}

export interface ProductVariantSortParameter {
  id?: Maybe<SortOrder>;

  productId?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  sku?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  price?: Maybe<SortOrder>;

  priceWithTax?: Maybe<SortOrder>;
}

export interface ProductVariantFilterParameter {
  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;

  languageCode?: Maybe<StringOperators>;

  sku?: Maybe<StringOperators>;

  name?: Maybe<StringOperators>;

  price?: Maybe<NumberOperators>;

  currencyCode?: Maybe<StringOperators>;

  priceIncludesTax?: Maybe<BooleanOperators>;

  priceWithTax?: Maybe<NumberOperators>;
}

export interface ProductListOptions {
  skip?: Maybe<number>;

  take?: Maybe<number>;

  sort?: Maybe<ProductSortParameter>;

  filter?: Maybe<ProductFilterParameter>;
}

export interface ProductSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  slug?: Maybe<SortOrder>;

  description?: Maybe<SortOrder>;
}

export interface ProductFilterParameter {
  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;

  languageCode?: Maybe<StringOperators>;

  name?: Maybe<StringOperators>;

  slug?: Maybe<StringOperators>;

  description?: Maybe<StringOperators>;
}

export interface SearchInput {
  term?: Maybe<string>;

  facetValueIds?: Maybe<string[]>;

  collectionId?: Maybe<string>;

  groupByProduct?: Maybe<boolean>;

  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<SearchResultSortParameter>;
}

export interface SearchResultSortParameter {
  name?: Maybe<SortOrder>;

  price?: Maybe<SortOrder>;
}

export interface CreateAddressInput {
  fullName?: Maybe<string>;

  company?: Maybe<string>;

  streetLine1: string;

  streetLine2?: Maybe<string>;

  city?: Maybe<string>;

  province?: Maybe<string>;

  postalCode?: Maybe<string>;

  countryCode: string;

  phoneNumber?: Maybe<string>;

  defaultShippingAddress?: Maybe<boolean>;

  defaultBillingAddress?: Maybe<boolean>;

  customFields?: Maybe<Json>;
}
/** Passed as input to the `addPaymentToOrder` mutation. */
export interface PaymentInput {
  /** This field should correspond to the `code` property of a PaymentMethodHandler. */
  method: string;
  /** This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method as the "metadata" argument. For example, it could contain an ID for the payment and other data generated by the payment provider. */
  metadata: Json;
}

export interface CreateCustomerInput {
  title?: Maybe<string>;

  firstName: string;

  lastName: string;

  phoneNumber?: Maybe<string>;

  emailAddress: string;

  customFields?: Maybe<Json>;
}

export interface RegisterCustomerInput {
  emailAddress: string;

  title?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  password?: Maybe<string>;
}

export interface UpdateCustomerInput {
  title?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  phoneNumber?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface UpdateAddressInput {
  id: string;

  fullName?: Maybe<string>;

  company?: Maybe<string>;

  streetLine1?: Maybe<string>;

  streetLine2?: Maybe<string>;

  city?: Maybe<string>;

  province?: Maybe<string>;

  postalCode?: Maybe<string>;

  countryCode?: Maybe<string>;

  phoneNumber?: Maybe<string>;

  defaultShippingAddress?: Maybe<boolean>;

  defaultBillingAddress?: Maybe<boolean>;

  customFields?: Maybe<Json>;
}

export interface ConfigArgInput {
  name: string;

  type: string;

  value: string;
}

export interface ConfigurableOperationInput {
  code: string;

  arguments: ConfigArgInput[];
}
/** @description ISO 639-1 language code @docsCategory common */
export enum LanguageCode {
  aa = "aa",
  ab = "ab",
  af = "af",
  ak = "ak",
  sq = "sq",
  am = "am",
  ar = "ar",
  an = "an",
  hy = "hy",
  as = "as",
  av = "av",
  ae = "ae",
  ay = "ay",
  az = "az",
  ba = "ba",
  bm = "bm",
  eu = "eu",
  be = "be",
  bn = "bn",
  bh = "bh",
  bi = "bi",
  bs = "bs",
  br = "br",
  bg = "bg",
  my = "my",
  ca = "ca",
  ch = "ch",
  ce = "ce",
  zh = "zh",
  cu = "cu",
  cv = "cv",
  kw = "kw",
  co = "co",
  cr = "cr",
  cs = "cs",
  da = "da",
  dv = "dv",
  nl = "nl",
  dz = "dz",
  en = "en",
  eo = "eo",
  et = "et",
  ee = "ee",
  fo = "fo",
  fj = "fj",
  fi = "fi",
  fr = "fr",
  fy = "fy",
  ff = "ff",
  ka = "ka",
  de = "de",
  gd = "gd",
  ga = "ga",
  gl = "gl",
  gv = "gv",
  el = "el",
  gn = "gn",
  gu = "gu",
  ht = "ht",
  ha = "ha",
  he = "he",
  hz = "hz",
  hi = "hi",
  ho = "ho",
  hr = "hr",
  hu = "hu",
  ig = "ig",
  is = "is",
  io = "io",
  ii = "ii",
  iu = "iu",
  ie = "ie",
  ia = "ia",
  id = "id",
  ik = "ik",
  it = "it",
  jv = "jv",
  ja = "ja",
  kl = "kl",
  kn = "kn",
  ks = "ks",
  kr = "kr",
  kk = "kk",
  km = "km",
  ki = "ki",
  rw = "rw",
  ky = "ky",
  kv = "kv",
  kg = "kg",
  ko = "ko",
  kj = "kj",
  ku = "ku",
  lo = "lo",
  la = "la",
  lv = "lv",
  li = "li",
  ln = "ln",
  lt = "lt",
  lb = "lb",
  lu = "lu",
  lg = "lg",
  mk = "mk",
  mh = "mh",
  ml = "ml",
  mi = "mi",
  mr = "mr",
  ms = "ms",
  mg = "mg",
  mt = "mt",
  mn = "mn",
  na = "na",
  nv = "nv",
  nr = "nr",
  nd = "nd",
  ng = "ng",
  ne = "ne",
  nn = "nn",
  nb = "nb",
  no = "no",
  ny = "ny",
  oc = "oc",
  oj = "oj",
  or = "or",
  om = "om",
  os = "os",
  pa = "pa",
  fa = "fa",
  pi = "pi",
  pl = "pl",
  pt = "pt",
  ps = "ps",
  qu = "qu",
  rm = "rm",
  ro = "ro",
  rn = "rn",
  ru = "ru",
  sg = "sg",
  sa = "sa",
  si = "si",
  sk = "sk",
  sl = "sl",
  se = "se",
  sm = "sm",
  sn = "sn",
  sd = "sd",
  so = "so",
  st = "st",
  es = "es",
  sc = "sc",
  sr = "sr",
  ss = "ss",
  su = "su",
  sw = "sw",
  sv = "sv",
  ty = "ty",
  ta = "ta",
  tt = "tt",
  te = "te",
  tg = "tg",
  tl = "tl",
  th = "th",
  bo = "bo",
  ti = "ti",
  to = "to",
  tn = "tn",
  ts = "ts",
  tk = "tk",
  tr = "tr",
  tw = "tw",
  ug = "ug",
  uk = "uk",
  ur = "ur",
  uz = "uz",
  ve = "ve",
  vi = "vi",
  vo = "vo",
  cy = "cy",
  wa = "wa",
  wo = "wo",
  xh = "xh",
  yi = "yi",
  yo = "yo",
  za = "za",
  zu = "zu"
}
/** @description ISO 4217 currency code @docsCategory common */
export enum CurrencyCode {
  AED = "AED",
  AFN = "AFN",
  ALL = "ALL",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CHE = "CHE",
  CHW = "CHW",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUC = "CUC",
  CUP = "CUP",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  FKP = "FKP",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GIP = "GIP",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IQD = "IQD",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LBP = "LBP",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRU = "MRU",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PAB = "PAB",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RON = "RON",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  SSP = "SSP",
  STN = "STN",
  SVC = "SVC",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TMT = "TMT",
  TND = "TND",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  UGX = "UGX",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VES = "VES",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  ZAR = "ZAR",
  ZMW = "ZMW",
  ZWL = "ZWL"
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC"
}

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  BINARY = "BINARY"
}

export enum AdjustmentType {
  TAX = "TAX",
  PROMOTION = "PROMOTION",
  SHIPPING = "SHIPPING",
  REFUND = "REFUND",
  TAX_REFUND = "TAX_REFUND",
  PROMOTION_REFUND = "PROMOTION_REFUND",
  SHIPPING_REFUND = "SHIPPING_REFUND"
}

export enum HistoryEntryType {
  ORDER_STATE_TRANSITION = "ORDER_STATE_TRANSITION",
  ORDER_PAYMENT_TRANSITION = "ORDER_PAYMENT_TRANSITION",
  ORDER_FULLFILLMENT = "ORDER_FULLFILLMENT",
  ORDER_CANCELLATION = "ORDER_CANCELLATION",
  ORDER_REFUND_TRANSITION = "ORDER_REFUND_TRANSITION",
  ORDER_NOTE = "ORDER_NOTE",
  ORDER_COUPON_APPLIED = "ORDER_COUPON_APPLIED",
  ORDER_COUPON_REMOVED = "ORDER_COUPON_REMOVED"
}
/** " @description Permissions for administrators and customers. Used to control access to GraphQL resolvers via the {@link Allow} decorator. @docsCategory common */
export enum Permission {
  Authenticated = "Authenticated",
  SuperAdmin = "SuperAdmin",
  Owner = "Owner",
  Public = "Public",
  CreateCatalog = "CreateCatalog",
  ReadCatalog = "ReadCatalog",
  UpdateCatalog = "UpdateCatalog",
  DeleteCatalog = "DeleteCatalog",
  CreateCustomer = "CreateCustomer",
  ReadCustomer = "ReadCustomer",
  UpdateCustomer = "UpdateCustomer",
  DeleteCustomer = "DeleteCustomer",
  CreateAdministrator = "CreateAdministrator",
  ReadAdministrator = "ReadAdministrator",
  UpdateAdministrator = "UpdateAdministrator",
  DeleteAdministrator = "DeleteAdministrator",
  CreateOrder = "CreateOrder",
  ReadOrder = "ReadOrder",
  UpdateOrder = "UpdateOrder",
  DeleteOrder = "DeleteOrder",
  CreatePromotion = "CreatePromotion",
  ReadPromotion = "ReadPromotion",
  UpdatePromotion = "UpdatePromotion",
  DeletePromotion = "DeletePromotion",
  CreateSettings = "CreateSettings",
  ReadSettings = "ReadSettings",
  UpdateSettings = "UpdateSettings",
  DeleteSettings = "DeleteSettings"
}

export enum StockMovementType {
  ADJUSTMENT = "ADJUSTMENT",
  SALE = "SALE",
  CANCELLATION = "CANCELLATION",
  RETURN = "RETURN"
}

export enum DeletionResult {
  DELETED = "DELETED",
  NOT_DELETED = "NOT_DELETED"
}

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = any;

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any;

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export namespace GetProductsList {
  export type Variables = {
    options?: Maybe<ProductListOptions>;
  };

  export type Query = {
    __typename?: "Query";

    products: Products;
  };

  export type Products = {
    __typename?: "ProductList";

    items: Items[];

    totalItems: number;
  };

  export type Items = ProductWithVariants.Fragment;
}

export namespace GetProduct {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    product: Maybe<Product>;
  };

  export type Product = ProductWithVariants.Fragment;
}

export namespace GetCollectionList {
  export type Variables = {
    options?: Maybe<CollectionListOptions>;
  };

  export type Query = {
    __typename?: "Query";

    collections: Collections;
  };

  export type Collections = {
    __typename?: "CollectionList";

    items: Items[];

    totalItems: number;
  };

  export type Items = {
    __typename?: "Collection";

    id: string;

    name: string;

    children: Maybe<Children[]>;

    description: string;

    parent: Maybe<Parent>;
  };

  export type Children = {
    __typename?: "Collection";

    id: string;

    name: string;
  };

  export type Parent = {
    __typename?: "Collection";

    id: string;

    name: string;
  };
}

export namespace GetCollection {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    collection: Maybe<Collection>;
  };

  export type Collection = {
    __typename?: "Collection";

    id: string;

    name: string;

    description: string;

    children: Maybe<Children[]>;
  };

  export type Children = {
    __typename?: "Collection";

    id: string;

    name: string;
  };
}

export namespace SearchProducts {
  export type Variables = {
    input: SearchInput;
  };

  export type Query = {
    __typename?: "Query";

    search: Search;
  };

  export type Search = {
    __typename?: "SearchResponse";

    items: Items[];

    totalItems: number;

    facetValues: FacetValues[];
  };

  export type Items = {
    __typename?: "SearchResult";

    productId: string;

    productVariantId: string;

    productVariantName: string;

    description: string;

    productPreview: string;

    sku: string;

    slug: string;

    price: Price;

    currencyCode: CurrencyCode;

    productName: string;
  };

  export type Price = PriceRangeInlineFragment | SinglePriceInlineFragment;

  export type PriceRangeInlineFragment = {
    __typename?: "PriceRange";

    min: number;

    max: number;
  };

  export type SinglePriceInlineFragment = {
    __typename?: "SinglePrice";

    value: number;
  };

  export type FacetValues = {
    __typename?: "FacetValueResult";

    count: number;

    facetValue: FacetValue;
  };

  export type FacetValue = {
    __typename?: "FacetValue";

    id: string;

    name: string;

    facet: Facet;
  };

  export type Facet = {
    __typename?: "Facet";

    id: string;

    code: string;

    name: string;
  };
}

export namespace AddToOrder {
  export type Variables = {
    id: string;
    qty: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addItemToOrder: Maybe<AddItemToOrder>;
  };

  export type AddItemToOrder = PartialOrder.Fragment;
}

export namespace AdjustItemQty {
  export type Variables = {
    id: string;
    qty: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    adjustOrderLine: Maybe<AdjustOrderLine>;
  };

  export type AdjustOrderLine = PartialOrder.Fragment;
}

export namespace RemoveItem {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeOrderLine: Maybe<RemoveOrderLine>;
  };

  export type RemoveOrderLine = PartialOrder.Fragment;
}

export namespace GetActiveOrder {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    activeOrder: Maybe<ActiveOrder>;
  };

  export type ActiveOrder = FullOrder.Fragment;
}

export namespace GetCustomer {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    activeCustomer: Maybe<ActiveCustomer>;
  };

  export type ActiveCustomer = {
    __typename?: "Customer";

    id: string;

    firstName: string;

    lastName: string;

    emailAddress: string;

    addresses: Maybe<Addresses[]>;
  };

  export type Addresses = Address.Fragment;
}

export namespace GetCountryList {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    availableCountries: AvailableCountries[];
  };

  export type AvailableCountries = {
    __typename?: "Country";

    id: string;

    name: string;

    code: string;
  };
}

export namespace GetShippingMethods {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    eligibleShippingMethods: EligibleShippingMethods[];
  };

  export type EligibleShippingMethods = {
    __typename?: "ShippingMethodQuote";

    id: string;

    description: string;

    price: number;
  };
}

export namespace GetNextStates {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    nextOrderStates: string[];
  };
}

export namespace TransitionOrderToState {
  export type Variables = {
    state: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    transitionOrderToState: Maybe<TransitionOrderToState>;
  };

  export type TransitionOrderToState = {
    __typename?: "Order";

    id: string;

    code: string;

    state: string;
  };
}

export namespace SetShippingMethod {
  export type Variables = {
    addressInput: CreateAddressInput;
    shippingMethodId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    setOrderShippingAddress: Maybe<SetOrderShippingAddress>;

    setOrderShippingMethod: Maybe<SetOrderShippingMethod>;
  };

  export type SetOrderShippingAddress = {
    __typename?: "Order";

    id: string;
  };

  export type SetOrderShippingMethod = {
    __typename?: "Order";

    subTotal: number;

    shipping: number;

    totalBeforeTax: number;

    currencyCode: CurrencyCode;

    total: number;
  } & PartialOrder.Fragment;
}

export namespace AddPaymentToOrder {
  export type Variables = {
    input: PaymentInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addPaymentToOrder: Maybe<AddPaymentToOrder>;
  };

  export type AddPaymentToOrder = {
    __typename?: "Order";

    id: string;

    state: string;

    code: string;
  };
}

export namespace SetCustomerForOrder {
  export type Variables = {
    input: CreateCustomerInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    setCustomerForOrder: Maybe<SetCustomerForOrder>;
  };

  export type SetCustomerForOrder = {
    __typename?: "Order";

    id: string;
  };
}

export namespace GetOrderByCode {
  export type Variables = {
    code: string;
  };

  export type Query = {
    __typename?: "Query";

    orderByCode: Maybe<OrderByCode>;
  };

  export type OrderByCode = FullOrder.Fragment;
}

export namespace CreateAccount {
  export type Variables = {
    input: RegisterCustomerInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    registerCustomerAccount: boolean;
  };
}

export namespace LogIn {
  export type Variables = {
    username: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    login: Login;
  };

  export type Login = {
    __typename?: "LoginResult";

    user: User;
  };

  export type User = {
    __typename?: "CurrentUser";

    id: string;

    identifier: string;
  };
}

export namespace LogOut {
  export type Variables = {};

  export type Mutation = {
    __typename?: "Mutation";

    logout: boolean;
  };
}

export namespace GetCustomerOrders {
  export type Variables = {
    options?: Maybe<OrderListOptions>;
  };

  export type Query = {
    __typename?: "Query";

    activeCustomer: Maybe<ActiveCustomer>;
  };

  export type ActiveCustomer = {
    __typename?: "Customer";

    orders: Orders;
  };

  export type Orders = {
    __typename?: "OrderList";

    items: Items[];

    totalItems: number;
  };

  export type Items = FullOrder.Fragment;
}

export namespace GetOrder {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    order: Maybe<Order>;
  };

  export type Order = FullOrder.Fragment;
}

export namespace UpdateCustomer {
  export type Variables = {
    input: UpdateCustomerInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateCustomer: UpdateCustomer;
  };

  export type UpdateCustomer = {
    __typename?: "Customer";

    id: string;

    firstName: string;

    lastName: string;

    emailAddress: string;
  };
}

export namespace UpdateAddress {
  export type Variables = {
    input: UpdateAddressInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateCustomerAddress: UpdateCustomerAddress;
  };

  export type UpdateCustomerAddress = Address.Fragment;
}

export namespace CreateAddress {
  export type Variables = {
    input: CreateAddressInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createCustomerAddress: CreateCustomerAddress;
  };

  export type CreateCustomerAddress = Address.Fragment;
}

export namespace DeleteAddress {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteCustomerAddress: boolean;
  };
}

export namespace UpdatePassword {
  export type Variables = {
    current: string;
    new: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateCustomerPassword: Maybe<boolean>;
  };
}

export namespace RequestPasswordReset {
  export type Variables = {
    emailAddress: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    requestPasswordReset: Maybe<boolean>;
  };
}

export namespace ResetPassword {
  export type Variables = {
    token: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    resetPassword: ResetPassword;
  };

  export type ResetPassword = {
    __typename?: "LoginResult";

    user: User;
  };

  export type User = {
    __typename?: "CurrentUser";

    id: string;
  };
}

export namespace ProductWithVariants {
  export type Fragment = {
    __typename?: "Product";

    id: string;

    name: string;

    slug: string;

    description: string;

    assets: Assets[];

    facetValues: FacetValues[];

    featuredAsset: Maybe<FeaturedAsset>;

    optionGroups: OptionGroups[];

    variants: Variants[];
  };

  export type Assets = {
    __typename?: "Asset";

    id: string;

    type: AssetType;

    preview: string;
  };

  export type FacetValues = {
    __typename?: "FacetValue";

    name: string;
  };

  export type FeaturedAsset = {
    __typename?: "Asset";

    preview: string;
  };

  export type OptionGroups = {
    __typename?: "ProductOptionGroup";

    id: string;

    code: string;

    name: string;

    options: Options[];
  };

  export type Options = {
    __typename?: "ProductOption";

    id: string;

    code: string;

    name: string;
  };

  export type Variants = {
    __typename?: "ProductVariant";

    id: string;

    name: string;

    sku: string;

    featuredAsset: Maybe<_FeaturedAsset>;

    facetValues: _FacetValues[];

    options: _Options[];

    price: number;

    currencyCode: CurrencyCode;
  };

  export type _FeaturedAsset = {
    __typename?: "Asset";

    id: string;

    preview: string;
  };

  export type _FacetValues = {
    __typename?: "FacetValue";

    name: string;
  };

  export type _Options = {
    __typename?: "ProductOption";

    id: string;

    code: string;

    name: string;
  };
}

export namespace PartialOrder {
  export type Fragment = {
    __typename?: "Order";

    id: string;

    active: boolean;

    code: string;

    lines: Lines[];
  };

  export type Lines = {
    __typename?: "OrderLine";

    productVariant: ProductVariant;

    unitPriceWithTax: number;

    quantity: number;
  };

  export type ProductVariant = {
    __typename?: "ProductVariant";

    id: string;

    sku: string;

    name: string;
  };
}

export namespace OrderAddress {
  export type Fragment = {
    __typename?: "OrderAddress";

    company: Maybe<string>;

    fullName: Maybe<string>;

    streetLine1: Maybe<string>;

    streetLine2: Maybe<string>;

    city: Maybe<string>;

    postalCode: Maybe<string>;

    countryCode: Maybe<string>;

    province: Maybe<string>;

    phoneNumber: Maybe<string>;
  };
}

export namespace FullOrder {
  export type Fragment = {
    __typename?: "Order";

    createdAt: DateTime;

    id: string;

    code: string;

    state: string;

    active: boolean;

    subTotal: number;

    shipping: number;

    totalBeforeTax: number;

    currencyCode: CurrencyCode;

    total: number;

    payments: Maybe<Payments[]>;

    lines: Lines[];

    billingAddress: Maybe<BillingAddress>;

    shippingAddress: Maybe<ShippingAddress>;

    customer: Maybe<Customer>;
  };

  export type Payments = {
    __typename?: "Payment";

    id: string;

    method: string;

    amount: number;

    transactionId: Maybe<string>;
  };

  export type Lines = {
    __typename?: "OrderLine";

    id: string;

    unitPriceWithTax: number;

    totalPrice: number;

    quantity: number;

    featuredAsset: Maybe<FeaturedAsset>;

    productVariant: ProductVariant;
  };

  export type FeaturedAsset = {
    __typename?: "Asset";

    preview: string;
  };

  export type ProductVariant = {
    __typename?: "ProductVariant";

    id: string;

    name: string;

    sku: string;

    options: Options[];
  };

  export type Options = {
    __typename?: "ProductOption";

    name: string;
  };

  export type BillingAddress = OrderAddress.Fragment;

  export type ShippingAddress = OrderAddress.Fragment;

  export type Customer = {
    __typename?: "Customer";

    id: string;

    firstName: string;

    lastName: string;
  };
}

export namespace Address {
  export type Fragment = {
    __typename?: "Address";

    id: string;

    company: Maybe<string>;

    fullName: Maybe<string>;

    streetLine1: string;

    streetLine2: Maybe<string>;

    city: Maybe<string>;

    province: Maybe<string>;

    postalCode: Maybe<string>;

    phoneNumber: Maybe<string>;

    country: Country;

    defaultBillingAddress: Maybe<boolean>;

    defaultShippingAddress: Maybe<boolean>;
  };

  export type Country = {
    __typename?: "Country";

    id: string;

    code: string;

    name: string;
  };
}
