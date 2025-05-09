export class Currency {
  public static format(value: number) {
    return new Intl.NumberFormat("en-us", {
      currency: "USD",
      currencySign: "standard",
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  }
}
