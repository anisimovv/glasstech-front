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
      <h1>{`Total ${total}`}</h1>
    </>
  );
};
