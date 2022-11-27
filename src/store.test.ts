import { DiscountOffer } from "./discountOffer";
import { Store } from "./store";

describe("Store", () => {
  describe("general behavior", () => {
    it("should create an empty discount offer list from an empty store", () => {
      expect(new Store().updateDiscounts()).toEqual([]);
    });

    it("should decrease the discount and expiresIn", () => {
      expect(
        new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 2)]);
    });

    it("should not decrease under 0", () => {
      expect(
        new Store([new DiscountOffer("test", 2, 0)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 0)]);
    });

    it("should not increase over 50", () => {
      expect(
        new Store([new DiscountOffer("Naturalia", 2, 50)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Naturalia", 1, 50)]);
    });

    it("should decrease the discount twice after expiration date", () => {
      expect(
        new Store([new DiscountOffer("test", 0, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", -1, 1)]);
    });
  });
});
