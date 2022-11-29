import { DiscountOffer } from "./discountOffer";

describe("DiscountOffer", () => {
  describe("getters and stringify", () => {
    const offer = new DiscountOffer("test", 2, 3);

    it("should get name", () => {
      expect(offer.partnerName).toEqual("test");
    });

    it("should get discount", () => {
      expect(offer.discountInPercent).toEqual(3);
    });

    it("should get expiration", () => {
      expect(offer.expiresIn).toEqual(2);
    });

    it("should create json object", () => {
      expect(JSON.stringify(offer)).toEqual(
        JSON.stringify({
          partnerName: "test",
          expiresIn: 2,
          discountInPercent: 3,
        })
      );
    });
  });

  it("should sort exceptions", () => {
    const vinted = new DiscountOffer("Vinted", 2, 3);

    expect(JSON.stringify(vinted)).toEqual(
      JSON.stringify({
        partnerName: "Vinted",
        expiresIn: 2,
        discountInPercent: 3,
      })
    );
  });

  it("should advance a day", () => {
    const offer = new DiscountOffer("test", 2, 3);
    offer.decrementExpirationDate();
    expect(offer.expiresIn).toEqual(1);
  });

  it("should decrement on update", () => {
    const offer = new DiscountOffer("test", 2, 3);
    offer.updateDiscount();
    expect(offer.discountInPercent).toEqual(2);
  });

  it("should decrement twice as fast when expired", () => {
    const offer = new DiscountOffer("test", 0, 3);
    offer.updateDiscount();
    expect(offer.discountInPercent).toEqual(1);
  });

  describe("check edge cases", () => {
    it("should not create an offer with a discount of more than 50", () => {
      const offer = new DiscountOffer("test", 2, 55);
      expect(offer.discountInPercent).toEqual(50);
    });

    it("should not increase discount to more than 50", () => {
      const offer = new DiscountOffer("test", 2, 3);
      offer.discountInPercent = 55;
      expect(offer.discountInPercent).toEqual(50);
    });

    it("should not create an offer with a discount of less than 0", () => {
      const offer = new DiscountOffer("test", 2, -3);
      expect(offer.discountInPercent).toEqual(0);
    });

    it("should not decrease discount to less than 0", () => {
      const offer = new DiscountOffer("test", 2, 3);
      offer.discountInPercent = -5;
      expect(offer.discountInPercent).toEqual(0);
    });
  });
});
