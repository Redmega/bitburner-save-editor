const locale = navigator.languages?.[0] ?? navigator.language;

export const formatMoney = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "USD",
  // currencySign: "$",
}).format;

export const formatNumber = new Intl.NumberFormat(locale).format;
