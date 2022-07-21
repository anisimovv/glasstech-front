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

  return (
    <>
      <div>{`square of glass = ${squareOfGlass}`}</div>
      <div>{`binding price = ${state.binding?.price || 0}`}</div>
    </>
  );
};
