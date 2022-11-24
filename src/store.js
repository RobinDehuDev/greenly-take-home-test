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
    this.settings = {
      default: createSettings(),
      Naturalia: createSettings({
        beforeExpirationUpdateRate: 1,
        afterExpirationUpdateRate: 2,
      }),
      Ilek: createSettings({ shouldUpdate: false }),
      Vinted: createSettings({
        beforeExpirationUpdateRate: 1,
        before10DaysExpirationUpdateRate: 2,
        before5DaysExpirationUpdateRate: 3,
        shouldResetDiscountAfterExpiration: true,
      }),
      BackMarket: createSettings({
        beforeExpirationUpdateRate: -2,
        afterExpirationUpdateRate: -4,
      }),
    };
  }

  updateDiscounts() {
    this.discountOffers = this.discountOffers.map((discountOffer) => {
      const offerSettings =
        this.settings[discountOffer.partnerName] ?? this.settings.default;

      if (!offerSettings.shouldUpdate) {
        if (discountOffer.discountInPercent > 50)
          discountOffer.discountInPercent = 50;

        if (discountOffer.discountInPercent < 0)
          discountOffer.discountInPercent = 0;

        return discountOffer;
      }

      discountOffer.discountInPercent = getDiscountInPercent(
        discountOffer,
        offerSettings
      );

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

const defaultSettings = {
  shouldUpdate: true,
  beforeExpirationUpdateRate: -1,
  afterExpirationUpdateRate: -2,
};

function createSettings(overrideSettings = {}) {
  return { ...defaultSettings, ...overrideSettings };
}

function getDiscountInPercent(discountOffer, offerSettings) {
  const isExpired = discountOffer.expiresIn <= 0;
  if (isExpired) {
    if (offerSettings.shouldResetDiscountAfterExpiration) {
      return 0;
    }
    return (
      discountOffer.discountInPercent + offerSettings.afterExpirationUpdateRate
    );
  }

  const isExpirationInLessThan5Days = discountOffer.expiresIn < 6;

  if (isExpirationInLessThan5Days) {
    return (
      discountOffer.discountInPercent +
      (offerSettings.before5DaysExpirationUpdateRate ??
        offerSettings.beforeExpirationUpdateRate)
    );
  }

  const isExpirationInLessThan10Days = discountOffer.expiresIn < 11;

  if (isExpirationInLessThan10Days) {
    return (
      discountOffer.discountInPercent +
      (offerSettings.before10DaysExpirationUpdateRate ??
        offerSettings.beforeExpirationUpdateRate)
    );
  }

  return (
    discountOffer.discountInPercent + offerSettings.beforeExpirationUpdateRate
  );
}
