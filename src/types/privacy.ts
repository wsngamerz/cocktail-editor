export enum Privacy {
  PUBLIC,
  PRIVATE,
  UNLISTED,
}

export const privacyToString = (privacy: Privacy): string => {
  switch (privacy) {
    case Privacy.PUBLIC:
      return "Public";
    case Privacy.PRIVATE:
      return "Private";
    case Privacy.UNLISTED:
      return "Unlisted";
  }
}