import { DiscountOffer } from "./discountOffer";

export class PartnerRules {
  _rules: Rules;

  constructor(partnerInputs: PartnerInput[] = defaultListOfPartners) {
    const partnerRules: Rules = { default: new Partner(defaultPartner) };

    partnerInputs
      .filter((partner) => partner.name !== "default")
      .forEach((partner) => {
        partnerRules[partner.name] = new Partner(partner);
      });

    this._rules = partnerRules;
  }

  private getPartnerRule(discountOffer: DiscountOffer) {
    const partnerRule =
      this._rules[discountOffer.partnerName] || this._rules.default;

    return partnerRule;
  }

  updateDiscountOffer(discountOffer: DiscountOffer) {
    this.getPartnerRule(discountOffer).updateDiscountOffer(discountOffer);
    return this;
  }
}
class Partner {
  private shouldSkipUpdate?: boolean;
  private defaultBehaviorAsFunction: (discountInPercent: number) => number;
  private exceptions: {
    threshold: number;
    update: (discountInPercent: number) => number;
  }[];

  constructor({ shouldSkipUpdate, defaultBehavior, exceptions }: PartnerInput) {
    this.shouldSkipUpdate = shouldSkipUpdate;

    this.defaultBehaviorAsFunction = DISCOUNT_UPDATE_RULES[
      defaultBehavior.type
    ](defaultBehavior.updateValue);

    this.exceptions = exceptions
      .sort((previous, next) => previous.threshold - next.threshold)
      .map(({ threshold, type, updateValue }) => ({
        threshold,
        update: DISCOUNT_UPDATE_RULES[type](updateValue),
      }));
  }

  private getUpdateFunction(discountOffer: DiscountOffer) {
    const exception = this.exceptions.find(
      (exception) => discountOffer.expiresIn <= exception.threshold
    );

    const updateFunction = exception?.update || this.defaultBehaviorAsFunction;

    return updateFunction;
  }

  updateDiscountOffer(discountOffer: DiscountOffer) {
    discountOffer.discountInPercent = this.getUpdateFunction(discountOffer)(
      discountOffer.discountInPercent
    );
    !this.shouldSkipUpdate && discountOffer.advanceADay();

    return this;
  }
}

type Rules = {
  default: Partner;
  [partnerName: string]: Partner | undefined;
};

const DISCOUNT_UPDATE_RULES: {
  [name: string]: (
    updateValue: number
  ) => (discountInPercent: number) => number;
} = {
  flat: (updateValue) => () => updateValue,
  add: (updateValue) => (discountInPercent) => discountInPercent + updateValue,
};

type PartnerInput = {
  name: string;
  shouldSkipUpdate?: boolean;
  defaultBehavior: {
    type: keyof typeof DISCOUNT_UPDATE_RULES;
    updateValue: number;
  };
  exceptions: {
    threshold: number;
    type: keyof typeof DISCOUNT_UPDATE_RULES;
    updateValue: number;
  }[];
};
const defaultPartner: PartnerInput = {
  name: "default",
  defaultBehavior: {
    type: "add",
    updateValue: -1,
  },
  exceptions: [
    {
      threshold: 0,
      type: "add",
      updateValue: -2,
    },
  ],
};
const defaultListOfPartners: PartnerInput[] = [
  {
    name: "Ilek",
    shouldSkipUpdate: true,
    defaultBehavior: {
      type: "add",
      updateValue: 0,
    },
    exceptions: [],
  },
  {
    name: "Naturalia",
    defaultBehavior: {
      type: "add",
      updateValue: 1,
    },
    exceptions: [
      {
        threshold: 0,
        type: "add",
        updateValue: 2,
      },
    ],
  },
  {
    name: "Vinted",
    defaultBehavior: {
      type: "add",
      updateValue: 1,
    },
    exceptions: [
      {
        threshold: 0,
        type: "flat",
        updateValue: 0,
      },
      {
        threshold: 5,
        type: "add",
        updateValue: 3,
      },
      {
        threshold: 10,
        type: "add",
        updateValue: 2,
      },
    ],
  },
  {
    name: "BackMarket",
    defaultBehavior: {
      type: "add",
      updateValue: -2,
    },
    exceptions: [
      {
        threshold: 0,
        type: "add",
        updateValue: -4,
      },
    ],
  },
];
