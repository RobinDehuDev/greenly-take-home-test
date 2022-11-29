import { getPartnerFromDB } from "./partner";
import {
  DAY_LENGTH,
  DISCOUNT_UPDATE_RULES,
  MAX_DISCOUNT_IN_PERCENT,
  MIN_DISCOUNT_IN_PERCENT,
  IDiscountOffer,
} from "./rules";

// honestly I wouldn't use private attributes and getters/setters on production code, unless dev team cannot be trusted, good exception would be here : set discountInPercent
export class DiscountOffer implements IDiscountOffer {
  private defaultBehaviorAsFunction: (discountOffer: DiscountOffer) => void;
  private exceptions: {
    threshold: number;
    update: (discountOffer: DiscountOffer) => void;
  }[];

  constructor(
    private _partnerName: string,
    private _expiresIn: number,
    private _discountInPercent: number
  ) {
    this.discountInPercent = _discountInPercent;

    const { defaultBehavior, exceptions } = getPartnerFromDB(_partnerName);

    this.defaultBehaviorAsFunction = DISCOUNT_UPDATE_RULES[
      defaultBehavior.type
    ](defaultBehavior.updateValue);

    this.exceptions = exceptions
      .sort((previous, next) => previous.threshold - next.threshold)
      .map(({ threshold, type, updateValue }) => ({
        threshold,
        update: DISCOUNT_UPDATE_RULES[type](updateValue),
      }));
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

  decrementExpirationDate() {
    this._expiresIn -= DAY_LENGTH;

    return this;
  }

  updateDiscount() {
    const exception = this.exceptions.find(
      (exception) => this._expiresIn <= exception.threshold
    );

    const updateFunction = exception?.update || this.defaultBehaviorAsFunction;

    updateFunction(this);

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
