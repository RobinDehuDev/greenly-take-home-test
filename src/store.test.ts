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

  describe("Naturalia", () => {
    it("should increase Naturalia discount", () => {
      expect(
        new Store([new DiscountOffer("Naturalia", 2, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Naturalia", 1, 4)]);
    });

    it("should increase Naturalia discount twice after expiration date", () => {
      expect(
        new Store([new DiscountOffer("Naturalia", 0, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Naturalia", -1, 5)]);
    });
  });

  describe("Ilek", () => {
    it("should not change Ilek", () => {
      expect(
        new Store([new DiscountOffer("Ilek", 1, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Ilek", 1, 3)]);
    });

    it("should not let Ilek have unexpected values", () => {
      expect(
        new Store([new DiscountOffer("Ilek", 2, 55)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Ilek", 2, 50)]);
      expect(
        new Store([new DiscountOffer("Ilek", 2, -5)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Ilek", 2, 0)]);
    });
  });

  describe("Vinted", () => {
    it("should set Vinted to 0 after expiration date", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 0, 50)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", -1, 0)]);
    });

    it("should increase Vinted", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 20, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 19, 4)]);
    });

    it("should increase Vinted by 2 under 10 days", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 10, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 9, 5)]);
    });

    it("should increase Vinted by 3 under 5 days", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 5, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 4, 6)]);
    });
  });

  describe("BackMarket", () => {
    it("should decrease BackMarket twice as much", () => {
      expect(
        new Store([new DiscountOffer("BackMarket", 20, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("BackMarket", 19, 1)]);
    });

    it("should decrease BackMarket by 4 after expiration date", () => {
      expect(
        new Store([new DiscountOffer("BackMarket", 0, 10)]).updateDiscounts()
      ).toEqual([new DiscountOffer("BackMarket", -1, 6)]);
    });
  });
});
