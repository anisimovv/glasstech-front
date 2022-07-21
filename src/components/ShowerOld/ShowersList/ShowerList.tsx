import React from "react";
import { IShower } from "../../../types";

interface ShowerListProps {
  showers: IShower[];
  selectShower: (showerId: string) => void;
}

export const ShowerList = ({ showers, selectShower }: ShowerListProps) => {
  return (
    <ul>
      {showers.map((shower) => (
        <li key={shower.id} onClick={() => selectShower(shower.id)}>
          {shower.name}
        </li>
      ))}
    </ul>
  );
};
