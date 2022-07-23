import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useGetShowers } from "../../../hooks/api/useGetShowers";
import { useShowerData } from "../shower-context";

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
    <div className="flex items-center justify-center w-full h-fit relative p-2">
      <button
        className="absolute left-2 z-10 cursor-pointer"
        type="button"
        onClick={() => handleChangeShower(currentIndex - 1)}
      >
        <span className="hidden">Previous shower</span>
        <ArrowCircleLeftIcon className="w-8 h-8 text-cyan-500" />
      </button>
      <Image
        src="https://glasstech.anisimovv.com/images/cabins/california.jpeg"
        width="156"
        height="250"
        alt={"picture"} // TODO
      />
      <button
        className="absolute right-2 z-10 cursor-pointer"
        type="button"
        onClick={() => handleChangeShower(currentIndex + 1)}
      >
        <span className="hidden">Next shower</span>
        <ArrowCircleRightIcon className="w-8 h-8 text-cyan-500" />
      </button>
    </div>
  );
};
