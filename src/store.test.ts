import { DiscountOffer } from "./discountOffer";
import { PartnerRules } from "./partnerRules";
import { Store } from "./store";

describe("Store", () => {
  it("should create an empty discount offer list from an empty store", () => {
    expect(new Store().updateDiscounts()).toEqual([]);
  });

  it("should update discount offer normaly", () => {
    const partnerRules = new PartnerRules([]);
    const offer = new DiscountOffer("Test", 2, 3);
    const store = new Store([offer], partnerRules);

    expect(store.updateDiscounts()).toEqual([new DiscountOffer("Test", 1, 2)]);
  });
});
