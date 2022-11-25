import { DiscountOffer } from "./discountOffer";

describe("Store", () => {
  it("should create a simple discount offer", () => {
    expect(new DiscountOffer("test", 2, 3)).toEqual({
      _partnerName: "test",
      _expiresIn: 2,
      _discountInPercent: 3,
    });
  });
});
