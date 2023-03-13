export class NumericHelper {
  public static convertToDecimalSeparator(amount: number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}