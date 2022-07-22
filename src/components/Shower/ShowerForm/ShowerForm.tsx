import React from "react";

import { IBinding, IElement, IGlass, IShower } from "../../../types";
import { useShowerData } from "../shower-context";
import ShowerElementInput from "../ShowerElementInput";
import Listbox from "../../Listbox";

type Props = {
  shower: IShower;
  glass: IGlass[];
};

export const ShowerForm = ({ shower, glass }: Props) => {
  const { state, dispatch } = useShowerData();

  React.useEffect(() => {
    dispatch({ type: "setBindingType", payload: shower.bindings[0] });
    dispatch({ type: "setGlass", payload: glass[0] });
  }, [shower, glass, dispatch]);

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

  const handleGlassChange = (glass: IGlass) => {
    dispatch({ type: "setGlass", payload: glass });
  };

  return (
    <div className="p-8 grow overflow-hidden">
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
        <Listbox value={state.binding} onChange={handleBindingChange} className="mb-4">
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
      <div>
        <Listbox value={state.glass} onChange={handleGlassChange}>
          <Listbox.Button>{state.glass?.name || ""}</Listbox.Button>
          <Listbox.Options>
            {glass.map((glass) => (
              <Listbox.Option key={glass.id} value={glass}>
                {glass.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
};
