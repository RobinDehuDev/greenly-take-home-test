import { PartnerRules } from "./partnerRules";
import { DiscountOffer } from "./discountOffer";

export class Store {
  constructor(
    private readonly discountOffers: DiscountOffer[] = [],
    private readonly partnerRules = new PartnerRules()
  ) {}

  updateDiscounts(): DiscountOffer[] {
    this.discountOffers.forEach((discountOffer) => {
      this.partnerRules.updateDiscountOffer(discountOffer);
    });

    return this.discountOffers;
  }
}
