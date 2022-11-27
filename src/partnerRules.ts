import { DiscountOffer } from "./discountOffer";

export class PartnerRules {
  private readonly rulesAsObject: {
    [company: string]: Rule | undefined;
    default: Rule;
  };

  constructor(rules: Rule[] = defaultPartners) {
    this.rulesAsObject = rules
      .filter((rule) => rule.name !== "default")
      .reduce((rulesAsObject, rule) => {
        rulesAsObject[rule.name] = rule;
        return rulesAsObject;
      }, defaultRulesAsObject);
  }

  getPartnerRules(partnerName: string): Rule {
    const partnerRules =
      this.rulesAsObject[partnerName] ?? this.rulesAsObject.default;

    return partnerRules;
  }
}

type Rule = {
  name: string;
  shouldSkipUpdate?: boolean;
  computeNewDiscount: (discountOffer: DiscountOffer) => number;
};

function defaultRuleFunction(
  increaseRateBeforeExpired: number = -1,
  increaseRateAfterExpired: number = -2
) {
  return ({ expiresIn, discountInPercent }: DiscountOffer) => {
    const isExpired = expiresIn <= 0;

    if (isExpired) {
      return discountInPercent + increaseRateAfterExpired;
    }

    return discountInPercent + increaseRateBeforeExpired;
  };
}

const defaultRulesAsObject = {
  default: {
    name: "default",
    computeNewDiscount: defaultRuleFunction(),
  },
};

const defaultPartners: Rule[] = [
  {
    name: "Ilek",
    shouldSkipUpdate: true,
    computeNewDiscount: ({ discountInPercent }) => discountInPercent,
  },
  {
    name: "Naturalia",
    computeNewDiscount: defaultRuleFunction(+1, +2),
  },
  {
    name: "Vinted",
    computeNewDiscount: ({ expiresIn, discountInPercent }) => {
      const isExpired = expiresIn <= 0;

      if (isExpired) {
        return 0;
      }

      const isExpirationInLessThan5Days = expiresIn <= 5;

      if (isExpirationInLessThan5Days) {
        return discountInPercent + 3;
      }

      const isExpirationInLessThan10Days = expiresIn <= 10;

      if (isExpirationInLessThan10Days) {
        return discountInPercent + 2;
      }

      return discountInPercent + 1;
    },
  },
  {
    name: "BackMarket",
    computeNewDiscount: defaultRuleFunction(-2, -4),
  },
];
