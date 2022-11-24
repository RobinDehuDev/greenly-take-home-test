export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

function getDiscountInPercent(discountOffer) {
  if (discountOffer.expiresIn <= 0) {
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

  if (discountOffer.partnerName === "Vinted" && discountOffer.expiresIn < 6) {
    return discountOffer.discountInPercent + 3;
  }

  if (discountOffer.partnerName === "Vinted" && discountOffer.expiresIn < 11) {
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
