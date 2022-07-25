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
              element={element}
            />
          );
        })}
      </div>
      <div>
        <Listbox
          value={state.binding}
          onChange={handleBindingChange}
          className="mb-4"
        >
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
