import { Hidden } from "../interfaces/Hidden.interface";

export const isHiddenOptions = (isHidden: boolean) => {
  const result: Hidden = {
    visibility: { visibility: "hidden" },
    readOnly: { readOnly: true },
    cursor: { cursor: "pointer" },
  };

  if (!isHidden) {
    result.visibility.visibility = "visible";
    result.readOnly = {};
    result.cursor.cursor = "auto";
  }

  return result;
};
