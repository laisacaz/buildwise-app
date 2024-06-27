export const todayDate = new Date();
export const dateFormat = "DD/MM/YYYY";
export const DATEMask = "##/##/####";

export const currencyMask = (
  number?: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
) => {
  if (number && !isNaN(number) && number !== undefined && isFinite(number)) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(number);
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(0);
};
