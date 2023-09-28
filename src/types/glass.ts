export enum Glass {
  MARTINI,
  HIGHBALL,
  OLD_FASHIONED,
  HURRICANE,
  FLUTE,
  SHOT,
  WINE,
  COLLINS,
  COUPE
}

export const glassToString = (glass: Glass): string => {
  switch (glass) {
    case Glass.MARTINI:
      return "Martini";
    case Glass.HIGHBALL:
      return "Highball";
    case Glass.OLD_FASHIONED:
      return "Old Fashioned";
    case Glass.HURRICANE:
      return "Hurricane";
    case Glass.FLUTE:
      return "Flute";
    case Glass.SHOT:
      return "Shot";
    case Glass.WINE:
      return "Wine";
    case Glass.COLLINS:
      return "Collins";
    case Glass.COUPE:
      return "Coupe";
  }
}