export class DiscountOffer {
  partnerName: string;
  expiresIn: number;
  discountInPercent: number;
  constructor(
    partnerName: string,
    expiresIn: number,
    discountRateInPercent: number
  ) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}
