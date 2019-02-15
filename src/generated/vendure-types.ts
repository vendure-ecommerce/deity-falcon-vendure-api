// tslint:disable
export type Maybe<T> = T | null;

export interface AdministratorListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<AdministratorSortParameter>;

  filter?: Maybe<AdministratorFilterParameter>;
}

export interface AdministratorSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  firstName?: Maybe<SortOrder>;

  lastName?: Maybe<SortOrder>;

  emailAddress?: Maybe<SortOrder>;
}

export interface AdministratorFilterParameter {
  firstName?: Maybe<StringOperators>;

  lastName?: Maybe<StringOperators>;

  emailAddress?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface StringOperators {
  eq?: Maybe<string>;

  contains?: Maybe<string>;
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

export interface AssetListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<AssetSortParameter>;

  filter?: Maybe<AssetFilterParameter>;
}

export interface AssetSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  description?: Maybe<SortOrder>;
}

export interface AssetFilterParameter {
  name?: Maybe<StringOperators>;

  description?: Maybe<StringOperators>;

  type?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface CountryListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<CountrySortParameter>;

  filter?: Maybe<CountryFilterParameter>;
}

export interface CountrySortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  enabled?: Maybe<SortOrder>;
}

export interface CountryFilterParameter {
  code?: Maybe<StringOperators>;

  name?: Maybe<StringOperators>;

  enabled?: Maybe<BooleanOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface BooleanOperators {
  eq?: Maybe<boolean>;
}

export interface CustomerListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<CustomerSortParameter>;

  filter?: Maybe<CustomerFilterParameter>;
}

export interface CustomerSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  firstName?: Maybe<SortOrder>;

  lastName?: Maybe<SortOrder>;

  phoneNumber?: Maybe<SortOrder>;

  emailAddress?: Maybe<SortOrder>;
}

export interface CustomerFilterParameter {
  firstName?: Maybe<StringOperators>;

  lastName?: Maybe<StringOperators>;

  phoneNumber?: Maybe<StringOperators>;

  emailAddress?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface OrderListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<OrderSortParameter>;

  filter?: Maybe<OrderFilterParameter>;
}

export interface OrderSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;
}

export interface OrderFilterParameter {
  code?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface FacetListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<FacetSortParameter>;

  filter?: Maybe<FacetFilterParameter>;
}

export interface FacetSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;
}

export interface FacetFilterParameter {
  name?: Maybe<StringOperators>;

  code?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface PaymentMethodListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<PaymentMethodSortParameter>;

  filter?: Maybe<PaymentMethodFilterParameter>;
}

export interface PaymentMethodSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;
}

export interface PaymentMethodFilterParameter {
  code?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface ProductCategoryListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<ProductCategorySortParameter>;

  filter?: Maybe<ProductCategoryFilterParameter>;
}

export interface ProductCategorySortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  description?: Maybe<SortOrder>;
}

export interface ProductCategoryFilterParameter {
  name?: Maybe<StringOperators>;

  description?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface ProductListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<ProductSortParameter>;

  filter?: Maybe<ProductFilterParameter>;

  categoryId?: Maybe<string>;
}

export interface ProductSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  slug?: Maybe<SortOrder>;
}

export interface ProductFilterParameter {
  name?: Maybe<StringOperators>;

  slug?: Maybe<StringOperators>;

  description?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface PromotionListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<PromotionSortParameter>;

  filter?: Maybe<PromotionFilterParameter>;
}

export interface PromotionSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;
}

export interface PromotionFilterParameter {
  name?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;

  type?: Maybe<StringOperators>;
}

export interface RoleListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<RoleSortParameter>;

  filter?: Maybe<RoleFilterParameter>;
}

export interface RoleSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;

  description?: Maybe<SortOrder>;
}

export interface RoleFilterParameter {
  code?: Maybe<StringOperators>;

  description?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface SearchInput {
  term?: Maybe<string>;

  facetIds?: Maybe<string[]>;

  groupByProduct?: Maybe<boolean>;

  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<SearchResultSortParameter>;
}

export interface SearchResultSortParameter {
  name?: Maybe<SortOrder>;

  price?: Maybe<SortOrder>;
}

export interface ShippingMethodListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<ShippingMethodSortParameter>;

  filter?: Maybe<ShippingMethodFilterParameter>;
}

export interface ShippingMethodSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  code?: Maybe<SortOrder>;

  description?: Maybe<SortOrder>;
}

export interface ShippingMethodFilterParameter {
  code?: Maybe<StringOperators>;

  description?: Maybe<StringOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface TaxRateListOptions {
  take?: Maybe<number>;

  skip?: Maybe<number>;

  sort?: Maybe<TaxRateSortParameter>;

  filter?: Maybe<TaxRateFilterParameter>;
}

export interface TaxRateSortParameter {
  id?: Maybe<SortOrder>;

  createdAt?: Maybe<SortOrder>;

  updatedAt?: Maybe<SortOrder>;

  name?: Maybe<SortOrder>;

  enabled?: Maybe<SortOrder>;
}

export interface TaxRateFilterParameter {
  code?: Maybe<StringOperators>;

  name?: Maybe<StringOperators>;

  enabled?: Maybe<BooleanOperators>;

  createdAt?: Maybe<DateOperators>;

  updatedAt?: Maybe<DateOperators>;
}

export interface CreateAdministratorInput {
  firstName: string;

  lastName: string;

  emailAddress: string;

  password: string;

  roleIds: string[];
}

export interface UpdateAdministratorInput {
  id: string;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  emailAddress?: Maybe<string>;

  password?: Maybe<string>;

  roleIds?: Maybe<string[]>;
}

export interface CreateAssetInput {
  file: Upload;
}

export interface RegisterCustomerInput {
  emailAddress: string;

  title?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;
}

export interface CreateChannelInput {
  code: string;

  token: string;

  defaultLanguageCode: LanguageCode;

  pricesIncludeTax: boolean;

  currencyCode: CurrencyCode;

  defaultTaxZoneId?: Maybe<string>;

  defaultShippingZoneId?: Maybe<string>;
}

export interface UpdateChannelInput {
  id: string;

  code?: Maybe<string>;

  token?: Maybe<string>;

  defaultLanguageCode?: Maybe<LanguageCode>;

  pricesIncludeTax?: Maybe<boolean>;

  currencyCode?: Maybe<CurrencyCode>;

  defaultTaxZoneId?: Maybe<string>;

  defaultShippingZoneId?: Maybe<string>;
}

export interface CreateCountryInput {
  code: string;

  translations: CountryTranslationInput[];

  enabled: boolean;
}

export interface CountryTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;
}

export interface UpdateCountryInput {
  id: string;

  code?: Maybe<string>;

  translations?: Maybe<CountryTranslationInput[]>;

  enabled?: Maybe<boolean>;
}

export interface CreateCustomerGroupInput {
  name: string;

  customerIds?: Maybe<string[]>;
}

export interface UpdateCustomerGroupInput {
  id: string;

  name?: Maybe<string>;
}

export interface CreateCustomerInput {
  title?: Maybe<string>;

  firstName: string;

  lastName: string;

  phoneNumber?: Maybe<string>;

  emailAddress: string;

  customFields?: Maybe<Json>;
}

export interface UpdateCustomerInput {
  id: string;

  title?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  phoneNumber?: Maybe<string>;

  emailAddress?: Maybe<string>;

  customFields?: Maybe<Json>;
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

export interface CreateFacetInput {
  code: string;

  translations: FacetTranslationInput[];

  values?: Maybe<CreateFacetValueWithFacetInput[]>;

  customFields?: Maybe<Json>;
}

export interface FacetTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface CreateFacetValueWithFacetInput {
  code: string;

  translations: FacetValueTranslationInput[];
}

export interface FacetValueTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface UpdateFacetInput {
  id: string;

  code?: Maybe<string>;

  translations?: Maybe<FacetTranslationInput[]>;

  customFields?: Maybe<Json>;
}

export interface CreateFacetValueInput {
  facetId: string;

  code: string;

  translations: FacetValueTranslationInput[];

  customFields?: Maybe<Json>;
}

export interface UpdateFacetValueInput {
  id: string;

  code?: Maybe<string>;

  translations?: Maybe<FacetValueTranslationInput[]>;

  customFields?: Maybe<Json>;
}

export interface UpdateGlobalSettingsInput {
  availableLanguages?: Maybe<LanguageCode[]>;

  customFields?: Maybe<Json>;
}

export interface PaymentInput {
  method: string;

  metadata: Json;
}

export interface UpdatePaymentMethodInput {
  id: string;

  code?: Maybe<string>;

  enabled?: Maybe<boolean>;

  configArgs?: Maybe<ConfigArgInput[]>;
}

export interface ConfigArgInput {
  name: string;

  value: string;
}

export interface CreateProductCategoryInput {
  featuredAssetId?: Maybe<string>;

  assetIds?: Maybe<string[]>;

  parentId?: Maybe<string>;

  facetValueIds?: Maybe<string[]>;

  translations: ProductCategoryTranslationInput[];

  customFields?: Maybe<Json>;
}

export interface ProductCategoryTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  description?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface UpdateProductCategoryInput {
  id: string;

  featuredAssetId?: Maybe<string>;

  parentId?: Maybe<string>;

  assetIds?: Maybe<string[]>;

  facetValueIds?: Maybe<string[]>;

  translations: ProductCategoryTranslationInput[];

  customFields?: Maybe<Json>;
}

export interface MoveProductCategoryInput {
  categoryId: string;

  parentId: string;

  index: number;
}

export interface CreateProductOptionGroupInput {
  code: string;

  translations: ProductOptionGroupTranslationInput[];

  options: CreateProductOptionInput[];

  customFields?: Maybe<Json>;
}

export interface ProductOptionGroupTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface CreateProductOptionInput {
  code: string;

  translations: ProductOptionGroupTranslationInput[];

  customFields?: Maybe<Json>;
}

export interface UpdateProductOptionGroupInput {
  id: string;

  code?: Maybe<string>;

  translations?: Maybe<ProductOptionGroupTranslationInput[]>;

  customFields?: Maybe<Json>;
}

export interface CreateProductInput {
  featuredAssetId?: Maybe<string>;

  assetIds?: Maybe<string[]>;

  facetValueIds?: Maybe<string[]>;

  translations: ProductTranslationInput[];

  customFields?: Maybe<Json>;
}

export interface ProductTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  slug?: Maybe<string>;

  description?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface UpdateProductInput {
  id: string;

  featuredAssetId?: Maybe<string>;

  assetIds?: Maybe<string[]>;

  facetValueIds?: Maybe<string[]>;

  translations?: Maybe<ProductTranslationInput[]>;

  customFields?: Maybe<Json>;
}

export interface UpdateProductVariantInput {
  id: string;

  translations?: Maybe<ProductVariantTranslationInput[]>;

  facetValueIds?: Maybe<string[]>;

  sku?: Maybe<string>;

  taxCategoryId?: Maybe<string>;

  price?: Maybe<number>;

  featuredAssetId?: Maybe<string>;

  assetIds?: Maybe<string[]>;

  customFields?: Maybe<Json>;
}

export interface ProductVariantTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export interface CreatePromotionInput {
  name: string;

  enabled: boolean;

  conditions: AdjustmentOperationInput[];

  actions: AdjustmentOperationInput[];
}

export interface AdjustmentOperationInput {
  code: string;

  arguments: ConfigArgInput[];
}

export interface UpdatePromotionInput {
  id: string;

  name?: Maybe<string>;

  enabled?: Maybe<boolean>;

  conditions?: Maybe<AdjustmentOperationInput[]>;

  actions?: Maybe<AdjustmentOperationInput[]>;
}

export interface CreateRoleInput {
  code: string;

  description: string;

  permissions: Permission[];
}

export interface UpdateRoleInput {
  id: string;

  code?: Maybe<string>;

  description?: Maybe<string>;

  permissions?: Maybe<Permission[]>;
}

export interface CreateShippingMethodInput {
  code: string;

  description: string;

  checker: AdjustmentOperationInput;

  calculator: AdjustmentOperationInput;
}

export interface UpdateShippingMethodInput {
  id: string;

  code?: Maybe<string>;

  description?: Maybe<string>;

  checker?: Maybe<AdjustmentOperationInput>;

  calculator?: Maybe<AdjustmentOperationInput>;
}

export interface CreateTaxCategoryInput {
  name: string;
}

export interface UpdateTaxCategoryInput {
  id: string;

  name?: Maybe<string>;
}

export interface CreateTaxRateInput {
  name: string;

  enabled: boolean;

  value: number;

  categoryId: string;

  zoneId: string;

  customerGroupId?: Maybe<string>;
}

export interface UpdateTaxRateInput {
  id: string;

  name?: Maybe<string>;

  value?: Maybe<number>;

  enabled?: Maybe<boolean>;

  categoryId?: Maybe<string>;

  zoneId?: Maybe<string>;

  customerGroupId?: Maybe<string>;
}

export interface CreateZoneInput {
  name: string;

  memberIds?: Maybe<string[]>;
}

export interface UpdateZoneInput {
  id: string;

  name?: Maybe<string>;
}

export interface CreateProductVariantInput {
  translations: ProductVariantTranslationInput[];

  facetValueIds?: Maybe<string[]>;

  sku: string;

  price?: Maybe<number>;

  taxCategoryId: string;

  optionIds?: Maybe<string[]>;

  featuredAssetId?: Maybe<string>;

  assetIds?: Maybe<string[]>;

  customFields?: Maybe<Json>;
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

export interface ProductOptionTranslationInput {
  id?: Maybe<string>;

  languageCode: LanguageCode;

  name?: Maybe<string>;

  customFields?: Maybe<Json>;
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC"
}
/** Permissions for administrators and customers */
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
  CreateSettings = "CreateSettings",
  ReadSettings = "ReadSettings",
  UpdateSettings = "UpdateSettings",
  DeleteSettings = "DeleteSettings"
}
/** ISO 639-1 language code */
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
/** ISO 4217 currency code */
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

export namespace GetCategoriesList {
  export type Variables = {
    options?: Maybe<ProductCategoryListOptions>;
  };

  export type Query = {
    __typename?: "Query";

    productCategories: ProductCategories;
  };

  export type ProductCategories = {
    __typename?: "ProductCategoryList";

    items: Items[];

    totalItems: number;
  };

  export type Items = {
    __typename?: "ProductCategory";

    id: string;

    name: string;

    children: Maybe<Children[]>;

    description: string;

    ancestorFacetValues: AncestorFacetValues[];

    facetValues: FacetValues[];

    parent: Parent;
  };

  export type Children = {
    __typename?: "ProductCategory";

    id: string;

    name: string;
  };

  export type AncestorFacetValues = {
    __typename?: "FacetValue";

    id: string;

    name: string;
  };

  export type FacetValues = {
    __typename?: "FacetValue";

    id: string;

    name: string;
  };

  export type Parent = {
    __typename?: "ProductCategory";

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
  };

  export type Items = {
    __typename?: "SearchResult";

    productId: string;

    description: string;

    productPreview: string;

    sku: string;

    slug: string;

    price: number;

    currencyCode: CurrencyCode;

    productName: string;
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

    name: Maybe<string>;
  };

  export type Variants = {
    __typename?: "ProductVariant";

    id: string;

    name: string;

    sku: string;

    facetValues: _FacetValues[];

    price: number;

    currencyCode: CurrencyCode;
  };

  export type _FacetValues = {
    __typename?: "FacetValue";

    name: string;
  };
}
