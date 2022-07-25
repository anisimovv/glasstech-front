import React from "react";
import { IBinding } from "../../../types";
import Listbox from "../../Listbox";
import { useShowerData } from "../shower-context";

type Props = {
  bindings: IBinding[];
};

export const ShowerBindingSelect = ({ bindings }: Props) => {
  const { state, dispatch } = useShowerData();

  const handleBindingChange = (binding: IBinding) => {
    dispatch({ type: "setBindingType", payload: binding });
  };

  return (
    <label className="text-slate-700">
      Binding type
      <Listbox
        value={state.binding}
        onChange={handleBindingChange}
        className="mb-4 mt-1"
      >
        <Listbox.Button>{state.binding?.title || ""}</Listbox.Button>
        <Listbox.Options>
          {bindings.map((binding) => (
            <Listbox.Option key={binding.id} value={binding}>
              {binding.title}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </label>
  );
};
