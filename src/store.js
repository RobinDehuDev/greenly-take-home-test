export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }

  updateDiscounts() {
    this.discountOffers = this.discountOffers.map((discountOffer) => {
      if (discountOffer.partnerName === "Ilek") {
        if (discountOffer.discountInPercent > 50)
          discountOffer.discountInPercent = 50;

        if (discountOffer.discountInPercent < 0)
          discountOffer.discountInPercent = 0;

        return discountOffer;
      }

      discountOffer.discountInPercent = getDiscountInPercent(discountOffer);

      if (discountOffer.discountInPercent > 50)
        discountOffer.discountInPercent = 50;

      if (discountOffer.discountInPercent < 0)
        discountOffer.discountInPercent = 0;

      discountOffer.expiresIn -= 1;

      return discountOffer;
    });

    return this.discountOffers;
  }
}

function getDiscountInPercent(discountOffer) {
  const isExpired = discountOffer.expiresIn <= 0;
  if (isExpired) {
    if (discountOffer.partnerName === "Naturalia") {
      return discountOffer.discountInPercent + 2;
    }

    if (discountOffer.partnerName === "Vinted") {
      return 0;
    }

    if (discountOffer.partnerName === "BackMarket") {
      return discountOffer.discountInPercent - 4;
    }
    return discountOffer.discountInPercent - 2;
  }

  const isExpirationInLessThan5Days = discountOffer.expiresIn < 6;

  if (discountOffer.partnerName === "Vinted" && isExpirationInLessThan5Days) {
    return discountOffer.discountInPercent + 3;
  }

  const isExpirationInLessThan10Days = discountOffer.expiresIn < 11;

  if (discountOffer.partnerName === "Vinted" && isExpirationInLessThan10Days) {
    return discountOffer.discountInPercent + 2;
  }

  if (
    discountOffer.partnerName === "Naturalia" ||
    discountOffer.partnerName === "Vinted"
  ) {
    return discountOffer.discountInPercent + 1;
  }

  if (discountOffer.partnerName === "BackMarket") {
    return discountOffer.discountInPercent - 2;
  }

  return discountOffer.discountInPercent - 1;
}
