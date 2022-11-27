import { PartnerRules } from "./partnerRules";
import { DiscountOffer } from "./discountOffer";

export class Store {
  constructor(
    private readonly discountOffers: DiscountOffer[] = [],
    private readonly partnerRules = new PartnerRules()
  ) {}

  updateDiscounts(): DiscountOffer[] {
    this.discountOffers.forEach((discountOffer) => {
      const partnerRules = this.partnerRules.getPartnerRules(
        discountOffer.partnerName
      );

      if (partnerRules.shouldSkipUpdate) {
        return undefined;
      }

      discountOffer.discountInPercent = partnerRules.computeNewDiscount(
        discountOffer
      );

      discountOffer.advanceADay();
    });

    return this.discountOffers;
  }
}
