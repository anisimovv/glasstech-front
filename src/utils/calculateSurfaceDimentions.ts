import { FieldsState, IElement } from "../types";

export const calculateSurfaceDimentions = (
  values: FieldsState,
  elements: IElement[]
): { width: number; height: number } => {
  if (!values) {
    return {
      width: 0,
      height: 0,
    };
  }

  return elements.reduce<any>(
    (acc, element) => {
      switch (element.type) {
        case "WIDTH":
          return {
            ...acc,
            width: acc.width + Number(values[element.id]),
          };
        case "HEIGHT":
          return {
            ...acc,
            height: acc.height + Number(values[element.id]),
          };

        default:
          return { ...acc };
      }
    },
    { width: 0, height: 0 }
  );
};
