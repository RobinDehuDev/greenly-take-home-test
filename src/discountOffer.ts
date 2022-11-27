const MAX_DISCOUNT_IN_PERCENT = 50;
const MIN_DISCOUNT_IN_PERCENT = 0;

export class DiscountOffer {
  constructor(
    private _partnerName: string,
    private _expiresIn: number,
    private _discountInPercent: number
  ) {
    this.discountInPercent = _discountInPercent;
  }

  get partnerName() {
    return this._partnerName;
  }

  get expiresIn() {
    return this._expiresIn;
  }

  get discountInPercent() {
    return this._discountInPercent;
  }

  set discountInPercent(discountInPercentValue: number) {
    this._discountInPercent = checkEdgeCases(discountInPercentValue);
  }

  advanceADay() {
    this._expiresIn -= 1;

    return this;
  }

  toJSON() {
    return {
      partnerName: this._partnerName,
      expiresIn: this._expiresIn,
      discountInPercent: this._discountInPercent,
    };
  }
}

function checkEdgeCases(discountInPercent: number) {
  if (discountInPercent > MAX_DISCOUNT_IN_PERCENT) {
    return MAX_DISCOUNT_IN_PERCENT;
  }

  if (discountInPercent < MIN_DISCOUNT_IN_PERCENT) {
    return MIN_DISCOUNT_IN_PERCENT;
  }

  return discountInPercent;
}
