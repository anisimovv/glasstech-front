import { useState } from "react";
import { IShower } from "../../../types";
import { ShowerDataProvider, useShowerData } from "../shower-context";
import ShowerForm from "../ShowerForm";
import ShowerPicker from "../ShowerPicker";
import TotalPrice from "../TotalPrice";

type Props = {
  showers: IShower[];
};

const ShowerCalculatorComponent = ({ showers }: Props) => {
  const { state } = useShowerData();

  const currentShower = showers[state.currentShowerIndex];

  return (
    <div className="flex max-w-[600px] mx-auto mt-[-80px] bg-slate-50 rounded-lg overflow-hidden drop-shadow-lg">
      <div className="flex flex-col w-[240px] bg-white">
        <h1 className="mx-4 my-8 text-2xl text-slate-900">
          {showers[state.currentShowerIndex].name}
        </h1>

        <div className="flex-grow">
          <ShowerPicker showers={showers} />
        </div>
        <TotalPrice shower={showers[state.currentShowerIndex]} />
      </div>
      <ShowerForm shower={currentShower} />
    </div>
  );
};

export const ShowerCalculator = ({ showers }: Props) => {
  return (
    <ShowerDataProvider>
      <ShowerCalculatorComponent showers={showers} />
    </ShowerDataProvider>
  );
};
