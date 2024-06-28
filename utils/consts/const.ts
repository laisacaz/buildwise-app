export const todayDate = new Date();
export const dateFormat = "DD/MM/YYYY";
export const DATEMask = "##/##/####";
export const CNPJMask = "##.###.###/####-##";

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

export const roundToTwoDecimals = (num: number) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  const result = (Math.round(m) / 100) * Math.sign(num);
  if (
    !isNaN(result) &&
    result !== null &&
    result !== undefined &&
    isFinite(result)
  ) {
    return result;
  } else {
    return 0;
  }
};
export const replaceDotWithComma = (num: number | string) => {
  // if (typeof num === 'number') {
  if (num) {
    const value = num.toString().replace(/\./g, ",");
    return String(value);
  } else return num;
};

export const twoDecimalsMask = (number?: number) => {
  if (!number) {
    return "0,00";
  }
  const value = roundToTwoDecimals(number);
  return replaceDotWithComma(value.toFixed(2));
};
