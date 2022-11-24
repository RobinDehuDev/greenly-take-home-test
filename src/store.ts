const MAX_PARTNER_DISCOUNT = 50;

export class DiscountOffer {
  partnerName: string;
  expiresIn: number;
  discountInPercent: number;
  constructor(
    partnerName: string,
    expiresIn: number,
    discountRateInPercent: number
  ) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

class DiscountSetting {
  pastExpirationDateIncreaseRate: number;
  preExpirationDateIncreaseRate: number;

  pre10DaysExpirationDateIncreaseRate: number;
  pre5DaysExpirationDateIncreaseRate: number;

  setDiscountTo0AfterExpirationDate: boolean;
  expiresInShouldDecrease: boolean;

  constructor(
    preExpirationDateIncreaseRate: number = -1,
    pastExpirationDateIncreaseRate: number = -2,
    pre10DaysExpirationDateIncreaseRate: number = preExpirationDateIncreaseRate,
    pre5DaysExpirationDateIncreaseRate: number = preExpirationDateIncreaseRate,
    setDiscountTo0AfterExpirationDate: boolean = false,
    expiresInShouldDecrease: boolean = true
  ) {
    this.pastExpirationDateIncreaseRate = pastExpirationDateIncreaseRate;
    this.preExpirationDateIncreaseRate = preExpirationDateIncreaseRate;
    this.pre10DaysExpirationDateIncreaseRate = pre10DaysExpirationDateIncreaseRate;
    this.pre5DaysExpirationDateIncreaseRate = pre5DaysExpirationDateIncreaseRate;
    this.setDiscountTo0AfterExpirationDate = setDiscountTo0AfterExpirationDate;
    this.expiresInShouldDecrease = expiresInShouldDecrease;
  }
}

function getDiscountInPercent(
  discountOffer: DiscountOffer,
  offerSettings: DiscountSetting
) {
  if (discountOffer.expiresIn < 0) {
    if (offerSettings.setDiscountTo0AfterExpirationDate) {
      return 0;
    }

    return (
      discountOffer.discountInPercent +
      offerSettings.pastExpirationDateIncreaseRate
    );
  }

  if (discountOffer.expiresIn < 6) {
    return (
      discountOffer.discountInPercent +
      offerSettings.pre5DaysExpirationDateIncreaseRate
    );
  }

  if (discountOffer.expiresIn < 11) {
    return (
      discountOffer.discountInPercent +
      offerSettings.pre10DaysExpirationDateIncreaseRate
    );
  }

  return (
    discountOffer.discountInPercent +
    offerSettings.preExpirationDateIncreaseRate
  );
}

export class Store {
  discountOffers: DiscountOffer[];
  discountSettings: { [company: string]: DiscountSetting };

  constructor(discountOffers: DiscountOffer[] = []) {
    this.discountOffers = discountOffers;
    this.discountSettings = {
      default: new DiscountSetting(),
      Naturalia: new DiscountSetting(1, 2),
      Ilek: new DiscountSetting(0, 0),
      Vinted: new DiscountSetting(1, 0, 2, 3, true),
    };
  }

  updateDiscounts() {
    this.discountOffers = this.discountOffers.map((discountOffer) => {
      const offerSettings =
        this.discountSettings[discountOffer.partnerName] ??
        this.discountSettings.default;

      discountOffer.discountInPercent = getDiscountInPercent(
        discountOffer,
        offerSettings
      );

      if (discountOffer.discountInPercent > MAX_PARTNER_DISCOUNT)
        discountOffer.discountInPercent = MAX_PARTNER_DISCOUNT;

      if (offerSettings.expiresInShouldDecrease) {
        discountOffer.expiresIn -= 1;
      }

      return discountOffer;
    });

    return this.discountOffers;
  }
}
