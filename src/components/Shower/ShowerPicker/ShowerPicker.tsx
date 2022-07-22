import { IShower } from "../../../types";
import { useGetShowers } from "../../hooks/api/useGetShowers";
import { useShowerData } from "../shower-context";

type Props = {
  showers: IShower[];
};

export const ShowerPicker = () => {
  const { showers } = useGetShowers();
  const { state, dispatch } = useShowerData();

  const limit = (showers?.length || 0) - 1;
  const currentIndex = state.currentShowerIndex;

  const handleChangeShower = (index: number) => {
    if (index < 0) {
      dispatch({ type: "setCurrentShowerIndex", payload: 0 });
      return;
    }

    if (index > limit) {
      dispatch({ type: "setCurrentShowerIndex", payload: limit });
      return;
    }

    dispatch({ type: "setCurrentShowerIndex", payload: index });
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => handleChangeShower(currentIndex - 1)}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => handleChangeShower(currentIndex + 1)}
      >
        Next
      </button>
    </div>
  );
};
