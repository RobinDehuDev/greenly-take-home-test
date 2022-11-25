import { DiscountOffer } from "./discountOffer";

describe("Store", () => {
  it("should create a simple discount offer", () => {
    expect(new DiscountOffer("test", 2, 3)).toEqual({
      partnerName: "test",
      expiresIn: 2,
      discountInPercent: 3,
    });
  });
});
