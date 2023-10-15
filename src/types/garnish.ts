export enum Garnish {
  LIME_WEDGE,
  LEMON_WEDGE,
  ORANGE_WEDGE,
}

export const garnishToString = (garnish: Garnish | string): string => {
  switch (garnish) {
    case Garnish.LIME_WEDGE:
      return "Lime Wedge";
    case Garnish.LEMON_WEDGE:
      return "Lemon Wedge";
    case Garnish.ORANGE_WEDGE:
      return "Orange Wedge";
  }

  return "Unknown";
};