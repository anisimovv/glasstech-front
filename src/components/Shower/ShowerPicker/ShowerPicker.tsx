import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useGetShowers } from "../../../hooks/api/useGetShowers";
import { IShower } from "../../../types";
import NavigationDots from "../../NavigationDots";
import { useShowerData } from "../shower-context";

type Props = {
  shower: IShower;
};

export const ShowerPicker = ({ shower }: Props) => {
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
    <div className="flex items-center justify-center w-full h-fit relative p-2 pb-10">
      <button
        className="p-0.5 absolute left-2 z-10 cursor-pointer rounded-full hover:bg-cyan-50 active:bg-cyan-100"
        type="button"
        onClick={() => handleChangeShower(currentIndex - 1)}
      >
        <span className="hidden">Previous shower</span>
        <ChevronLeftIcon className="w-8 h-8 text-cyan-500" />
      </button>
      {shower.image ? (
        <Image
          src={shower.image}
          width="156"
          height="250"
          alt="shower picture"
          placeholder="blur"
          blurDataURL="https://glasstech.anisimovv.com/images/cabins/no-picture.jpeg"
        />
      ) : (
        <Image
          src="https://glasstech.anisimovv.com/images/cabins/no-picture.jpeg"
          width="156"
          height="250"
          alt="shower picture"
          placeholder="blur"
          blurDataURL="https://glasstech.anisimovv.com/images/cabins/no-picture.jpeg"
        />
      )}
      <div className="absolute bottom-4">
        <NavigationDots
          length={showers?.length as number}
          current={state.currentShowerIndex}
        />
      </div>
      <button
        className="absolute p-0.5 right-2 z-10 cursor-pointer rounded-full hover:bg-cyan-50 active:bg-cyan-100"
        type="button"
        onClick={() => handleChangeShower(currentIndex + 1)}
      >
        <span className="hidden">Next shower</span>
        <ChevronRightIcon className="w-8 h-8 text-cyan-500" />
      </button>
    </div>
  );
};
