import React from "react";
import { IElement, IShower } from "../../../types";
import { useShowerData } from "../shower-context";
import ShowerElementInput from "../ShowerElementInput";

type Props = {
  shower: IShower;
};

export const ShowerForm = ({ shower }: Props) => {
  const { state, dispatch } = useShowerData();

  const { showerElementsInput } = state;

  const handleElementFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value, name } = target;

    dispatch({
      type: "setShowerElementInput",
      payload: { id: name, value },
    });
  };

  const handleElementFieldFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value, name } = target;

    const focusedElement = shower.elements.find(
      (element) => element.id === name
    ) as IElement;

    if (!value) {
      dispatch({
        type: "setShowerElementInput",
        payload: { id: name, value: focusedElement.defaultValue.toString() },
      });

      return;
    }

    if (+value < focusedElement.minValue) {
      dispatch({
        type: "setShowerElementInput",
        payload: { id: name, value: focusedElement.minValue.toString() },
      });

      return;
    }

    if (+value > focusedElement.maxValue) {
      dispatch({
        type: "setShowerElementInput",
        payload: { id: name, value: focusedElement.maxValue.toString() },
      });

      return;
    }
  };

  return (
    <div className="p-8 grow">
      {shower.elements.map((element) => {
        return (
          <ShowerElementInput
            key={element.id}
            title={element.title}
            value={showerElementsInput[element.id] ?? element.defaultValue}
            name={element.id}
            onChange={handleElementFieldChange}
            onBlur={handleElementFieldFocus}
          />
        );
      })}
    </div>
  );
};
