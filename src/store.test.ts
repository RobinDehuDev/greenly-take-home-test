import { DiscountOffer } from "./discountOffer";
import { PartnerRules } from "./partnerRules";
import { Store } from "./store";

describe("Store", () => {
  it("should create an empty discount offer list from an empty store", () => {
    expect(new Store().updateDiscounts()).toEqual([]);
  });

  it("should not update if partner set this rule", () => {
    const partnerRules = new PartnerRules([
      {
        name: "Ilek",
        shouldSkipUpdate: true,
        computeNewDiscount: ({ discountInPercent }) => discountInPercent,
      },
    ]);
    const offer = new DiscountOffer("Ilek", 1, 3);
    const store = new Store([offer], partnerRules);

    expect(store.updateDiscounts()).toEqual([new DiscountOffer("Ilek", 1, 3)]);
  });

  it("should update discount offer normaly", () => {
    const partnerRules = new PartnerRules([]);
    const offer = new DiscountOffer("Test", 2, 3);
    const store = new Store([offer], partnerRules);

    expect(store.updateDiscounts()).toEqual([new DiscountOffer("Test", 1, 2)]);
  });
});
