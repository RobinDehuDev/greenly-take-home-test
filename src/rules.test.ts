import { DISCOUNT_UPDATE_RULES, IDiscountOffer } from "./rules";

class MockDiscountOffer implements IDiscountOffer {
  constructor(
    public partnerName: string,
    public expiresIn: number,
    public discountInPercent: number
  ) {}

  decrementExpirationDate() {
    this.expiresIn -= 1;

    return this;
  }
}

describe("Rules", () => {
  it("should not change discount if skip is selected", () => {
    const discountOffer = new MockDiscountOffer("test", 3, 1);
    DISCOUNT_UPDATE_RULES.skip()();

    expect(discountOffer).toEqual({
      partnerName: "test",
      expiresIn: 3,
      discountInPercent: 1,
    });
  });

  it("should increment by 1 if add is selected", () => {
    const discountOffer = new MockDiscountOffer("test", 3, 1);
    DISCOUNT_UPDATE_RULES.add(1)(discountOffer);

    expect(discountOffer).toEqual({
      partnerName: "test",
      expiresIn: 2,
      discountInPercent: 2,
    });
  });

  it("should set to 5 if flat is selected", () => {
    const discountOffer = new MockDiscountOffer("test", 3, 1);
    DISCOUNT_UPDATE_RULES.flat(5)(discountOffer);

    expect(discountOffer).toEqual({
      partnerName: "test",
      expiresIn: 2,
      discountInPercent: 5,
    });
  });
});
