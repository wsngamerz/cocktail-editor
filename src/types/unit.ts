export enum Unit {
  ML,
  CL,
  L,
  DASH,
  PINCH,
  TEASPOON,
  TABLESPOON,
  CUP,
  PART,
  DROP,
  COUNT,
  TOP,
  NONE,
}

export const unitToString = (unit: Unit): string => {
  switch (unit) {
    case Unit.ML:
      return "ml";
    case Unit.CL:
      return "cl";
    case Unit.L:
      return "l";
    case Unit.DASH:
      return "dash";
    case Unit.PINCH:
      return "pinch";
    case Unit.TEASPOON:
      return "teaspoon";
    case Unit.TABLESPOON:
      return "tablespoon";
    case Unit.CUP:
      return "cup";
    case Unit.PART:
      return "part";
    case Unit.DROP:
      return "drop";
    case Unit.COUNT:
      return "count";
    case Unit.TOP:
      return "top";
    case Unit.NONE:
      return "none";
  }
};