import { DiscountOffer } from "./discountOffer";
import { PartnerRules } from "./partnerRules";

describe("PartnerRules", () => {
  const partnerRule = new PartnerRules();

  describe("default", () => {
    const testPartner = partnerRule.getPartnerRules("Test");

    it("should decrease Test discount", () => {
      const offer = new DiscountOffer("Test", 2, 3);

      expect(testPartner.computeNewDiscount(offer)).toEqual(2);
    });

    it("should decrease Test discount twice as much after expiration date", () => {
      const offer = new DiscountOffer("Test", 0, 3);

      expect(testPartner.computeNewDiscount(offer)).toEqual(1);
    });
  });

  describe("Naturalia", () => {
    const naturalia = partnerRule.getPartnerRules("Naturalia");

    it("should increase Naturalia discount", () => {
      const offer = new DiscountOffer("Naturalia", 2, 3);

      expect(naturalia.computeNewDiscount(offer)).toEqual(4);
    });

    it("should increase Naturalia discount twice after expiration date", () => {
      const offer = new DiscountOffer("Naturalia", 0, 3);

      expect(naturalia.computeNewDiscount(offer)).toEqual(5);
    });
  });

  describe("Ilek", () => {
    const ilek = partnerRule.getPartnerRules("Ilek");

    it("should skip update", () => {
      expect(ilek.shouldSkipUpdate).toEqual(true);
    });

    it("should not change Ilek discount", () => {
      const offer = new DiscountOffer("Ilek", 1, 3);

      expect(ilek.computeNewDiscount(offer)).toEqual(3);
    });
  });

  describe("Vinted", () => {
    const vinted = partnerRule.getPartnerRules("Vinted");

    it("should set Vinted to 0 after expiration date", () => {
      const offer = new DiscountOffer("Vinted", 0, 3);

      expect(vinted.computeNewDiscount(offer)).toEqual(0);
    });

    it("should increase Vinted", () => {
      const offer = new DiscountOffer("Vinted", 20, 3);

      expect(vinted.computeNewDiscount(offer)).toEqual(4);
    });

    it("should increase Vinted by 2 under 10 days", () => {
      const offer = new DiscountOffer("Vinted", 10, 3);

      expect(vinted.computeNewDiscount(offer)).toEqual(5);
    });

    it("should increase Vinted by 3 under 5 days", () => {
      const offer = new DiscountOffer("Vinted", 5, 3);

      expect(vinted.computeNewDiscount(offer)).toEqual(6);
    });
  });

  describe("BackMarket", () => {
    const backMarket = partnerRule.getPartnerRules("BackMarket");

    it("should decrease BackMarket twice as much", () => {
      const offer = new DiscountOffer("BackMarket", 20, 3);

      expect(backMarket.computeNewDiscount(offer)).toEqual(1);
    });

    it("should decrease BackMarket by 4 after expiration date", () => {
      const offer = new DiscountOffer("BackMarket", 0, 10);

      expect(backMarket.computeNewDiscount(offer)).toEqual(6);
    });
  });
});
