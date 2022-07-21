import React from "react";
import { Listbox, Transition } from "@headlessui/react";

import { IBinding, IElement, IShower } from "../../../types";
import { useShowerData } from "../shower-context";
import ShowerElementInput from "../ShowerElementInput";

type Props = {
  shower: IShower;
};

export const ShowerForm = ({ shower }: Props) => {
  const { state, dispatch } = useShowerData();

  React.useEffect(() => {
    dispatch({ type: "setBindingType", payload: shower.bindings[0] });
  }, [shower, dispatch]);

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

  const handleBindingChange = (binding: IBinding) => {
    dispatch({ type: "setBindingType", payload: binding });
  };

  return (
    <div className="p-8 grow">
      <div className="mb-6">
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
      <div>
        <Listbox value={state.binding} onChange={handleBindingChange}>
          <Listbox.Button>{state.binding?.title || ""}</Listbox.Button>
          <Listbox.Options>
            {shower.bindings.map((binding) => (
              <Listbox.Option key={binding.id} value={binding}>
                {binding.title}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
};
