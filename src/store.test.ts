import { DiscountOffer } from "./discountOffer";
import { Store } from "./store";

describe("Store", () => {
  it("should create an empty discount offer list from an empty store", () => {
    expect(new Store().updateDiscounts()).toEqual([]);
  });

  it("should update discount offer normaly", () => {
    const offer = new DiscountOffer("Test", 2, 3);
    const store = new Store([offer]);

    const updated = store.updateDiscounts();

    expect(JSON.stringify(updated)).toEqual(
      '[{"partnerName":"Test","expiresIn":1,"discountInPercent":2}]'
    );
  });
});
