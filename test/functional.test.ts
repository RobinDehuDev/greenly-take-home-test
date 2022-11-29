import { DiscountOffer } from "../src/discountOffer";

describe("Functional Tests", () => {
  describe("default", () => {
    it("should decrease Test discount", () => {
      const offer = new DiscountOffer("Test", 2, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Test",
        expiresIn: 1,
        discountInPercent: 2,
      });
    });

    it("should decrease Test discount twice as much after expiration date", () => {
      const offer = new DiscountOffer("Test", 0, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Test",
        expiresIn: -1,
        discountInPercent: 1,
      });
    });
  });

  describe("Naturalia", () => {
    it("should increase Naturalia discount", () => {
      const offer = new DiscountOffer("Naturalia", 2, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Naturalia",
        expiresIn: 1,
        discountInPercent: 4,
      });
    });

    it("should increase Naturalia discount twice after expiration date", () => {
      const offer = new DiscountOffer("Naturalia", 0, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Naturalia",
        expiresIn: -1,
        discountInPercent: 5,
      });
    });
  });

  describe("Ilek", () => {
    it("should not update Ilek at all", () => {
      const offer = new DiscountOffer("Ilek", 1, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Ilek",
        expiresIn: 1,
        discountInPercent: 3,
      });
    });
  });

  describe("Vinted", () => {
    it("should set Vinted to 0 after expiration date", () => {
      const offer = new DiscountOffer("Vinted", 0, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Vinted",
        expiresIn: -1,
        discountInPercent: 0,
      });
    });

    it("should increase Vinted", () => {
      const offer = new DiscountOffer("Vinted", 20, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Vinted",
        expiresIn: 19,
        discountInPercent: 4,
      });
    });

    it("should increase Vinted by 2 under 10 days", () => {
      const offer = new DiscountOffer("Vinted", 10, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Vinted",
        expiresIn: 9,
        discountInPercent: 5,
      });
    });

    it("should increase Vinted by 3 under 5 days", () => {
      const offer = new DiscountOffer("Vinted", 5, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "Vinted",
        expiresIn: 4,
        discountInPercent: 6,
      });
    });
  });

  describe("BackMarket", () => {
    it("should decrease BackMarket twice as much", () => {
      const offer = new DiscountOffer("BackMarket", 20, 3);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "BackMarket",
        expiresIn: 19,
        discountInPercent: 1,
      });
    });

    it("should decrease BackMarket by 4 after expiration date", () => {
      const offer = new DiscountOffer("BackMarket", 0, 10);
      offer.updateDiscount();

      expect(offer.toJSON()).toEqual({
        partnerName: "BackMarket",
        expiresIn: -1,
        discountInPercent: 6,
      });
    });
  });
});
