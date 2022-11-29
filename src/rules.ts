export const MAX_DISCOUNT_IN_PERCENT = 50;
export const MIN_DISCOUNT_IN_PERCENT = 0;
export const DAY_LENGTH = 1;
export interface IDiscountOffer {
  discountInPercent: number;
  decrementExpirationDate: () => IDiscountOffer;
}
export const DISCOUNT_UPDATE_RULES = {
  skip: () => () => {},
  flat: (updateValue: number) => (discountOffer: IDiscountOffer) => {
    discountOffer.discountInPercent = updateValue;
    discountOffer.decrementExpirationDate();
  },
  add: (updateValue: number) => (discountOffer: IDiscountOffer) => {
    discountOffer.discountInPercent =
      discountOffer.discountInPercent + updateValue;
    discountOffer.decrementExpirationDate();
  },
};
