export interface Hidden {
  visibility: {
    visibility: "visible" | "hidden";
  };
  readOnly:
    | {
        readOnly: boolean;
      }
    | {};
  cursor: {
    cursor: "pointer" | "auto";
  };
}
