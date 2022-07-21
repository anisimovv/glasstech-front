import React from "react";
import { IShower } from "../../../types";
import { ElementFields } from "../ElementFields/ElementFields";

interface SingleShowerProps {
  shower: IShower;
}

export const SingleShower = ({ shower }: SingleShowerProps) => {
  const [surfaceArea, setSurfaceArea] = React.useState("");

  const handleElementsChange = (surfaceArea: string) => {
    setSurfaceArea(surfaceArea);
  };

  return (
    <div>
      <div>
        <h2>{shower.name}</h2>
        <p>Min-price: {shower.minPrice}</p>
        <p>Max-price: {shower.maxPrice}</p>
      </div>
      <hr />
      <ElementFields
        elements={shower.elements}
        onChange={handleElementsChange}
      />
      <hr />
      Surface area -- {surfaceArea}
      <br />
      Total price: --
    </div>
  );
};
