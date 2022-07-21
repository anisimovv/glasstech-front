import { IShower } from "../../types";
import { useShowerData } from "./shower-context";

export const useGlassCalculations = (shower: IShower): number => {
  const { state } = useShowerData();

  const { showerElementsInput } = state;

  const widthElements = shower.elements.filter(
    (element) => element.type === "WIDTH"
  );

  const heightElements = shower.elements.filter(
    (element) => element.type === "HEIGHT"
  );

  const totalWidth = widthElements.reduce((acc, element) => {
    const valueFromState = showerElementsInput[element.id];

    if (valueFromState) {
      return acc + +valueFromState;
    } else {
      return acc + element.defaultValue;
    }
  }, 0);

  const totalHeight = heightElements.reduce((acc, element) => {
    const valueFromState = showerElementsInput[element.id];

    if (valueFromState) {
      return acc + +valueFromState;
    } else {
      return acc + element.defaultValue;
    }
  }, 0);

  const squareOfGlass = totalWidth * totalHeight / 1000000;

  return +squareOfGlass.toFixed(2);
};
