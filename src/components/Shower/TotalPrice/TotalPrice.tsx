import React from "react";
import { IShower } from "../../../types";
import { useShowerData } from "../shower-context";
import { useGlassCalculations } from "../useGlassCalculations";

type Props = {
  shower: IShower;
};

export const TotalPrice = ({ shower }: Props) => {
  const { state } = useShowerData();

  const squareOfGlass = useGlassCalculations(shower);
  const glassPrice = squareOfGlass * (state.glass?.price || 0);
  const total = glassPrice + (state.binding?.price || 0);

  return (
    <>
      <div className="flex justify-between items-center p-4 border-t-2 border-slate-50">
        <div className="w-1/2">
          <h2 className="text-lg text-slate-700">Total price</h2>
          <h3 className="text-xs text-slate-400 leading-tight">Tax and delivery included</h3>
        </div>
        <strong className="text-2xl font-normal text-slate-900">{`$${total}`}</strong>
      </div>
    </>
  );
};
