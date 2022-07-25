import React from "react";

import { IGlass, IShower } from "../../../types";
import { useShowerData } from "../shower-context";

import ShowerElementInput from "../ShowerElementInput";
import ShowerBindingSelect from "../ShowerBindingSelect";
import ShowerGlassSelect from "../ShowerGlassSelect";

type Props = {
  shower: IShower;
  glass: IGlass[];
};

export const ShowerForm = ({ shower, glass }: Props) => {
  const { dispatch } = useShowerData();

  React.useEffect(() => {
    dispatch({ type: "setBindingType", payload: shower.bindings[0] });
    dispatch({ type: "setGlass", payload: glass[0] });
  }, [shower, glass, dispatch]);

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
      <ShowerBindingSelect bindings={shower.bindings} />
      <ShowerGlassSelect glass={glass} />
    </div>
  );
};
