export const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // currencySign: "$",
}).format;

export const formatNumber = new Intl.NumberFormat("en-US").format;
