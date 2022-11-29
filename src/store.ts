import { DiscountOffer } from "./discountOffer";

export class Store {
  constructor(private readonly discountOffers: DiscountOffer[] = []) {}

  updateDiscounts(): DiscountOffer[] {
    this.discountOffers.forEach((discountOffer) => {
      discountOffer.updateDiscount();
    });

    return this.discountOffers;
  }
}
