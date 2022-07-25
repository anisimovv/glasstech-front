import React from "react";
import { IGlass } from "../../../types";
import Listbox from "../../Listbox";
import { useShowerData } from "../shower-context";

type Props = {
  glass: IGlass[];
};

export const ShowerGlassSelect = ({ glass }: Props) => {
  const { state, dispatch } = useShowerData();

  const handleGlassChange = (glass: IGlass) => {
    dispatch({ type: "setGlass", payload: glass });
  };

  return (
    <label className="text-slate-700">
      Glass type
      <Listbox
        value={state.glass}
        onChange={handleGlassChange}
        className="mt-1"
      >
        <Listbox.Button>{state.glass?.name || ""}</Listbox.Button>
        <Listbox.Options>
          {glass.map((glass) => (
            <Listbox.Option key={glass.id} value={glass}>
              {glass.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </label>
  );
};
