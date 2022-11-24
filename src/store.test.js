import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should decrease the discount and expiresIn", () => {
    expect(
      new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 1, 2)]);
  });

  it("should not change Vinted Once he reached max", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 0, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", -1, 0)]);
  });
});
