import { DISCOUNT_UPDATE_RULES } from "./rules";

type PartnerInput = {
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

// mocked database
const PARTNERS: {
  default: PartnerInput;
  [name: string]: PartnerInput | undefined;
} = {
  default: {
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
  },
  Ilek: {
    defaultBehavior: {
      type: "skip",
      updateValue: 0,
    },
    exceptions: [],
  },
  Naturalia: {
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
  Vinted: {
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
  BackMarket: {
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
};

export function getPartnerFromDB(partnerName: string) {
  const partner = PARTNERS[partnerName] ?? PARTNERS.default;

  return partner;
}
