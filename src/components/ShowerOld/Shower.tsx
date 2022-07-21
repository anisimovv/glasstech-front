import { useMemo, useState } from "react";
import { IShower } from "../../types";
import { ShowerList } from "./ShowersList/ShowerList";
import { SingleShower } from "./SingleShower/SingleShower";

interface ShowerProps {
  showers: IShower[];
}

export const Shower = ({ showers }: ShowerProps) => {
  const [selectedShower, setSelectedShower] = useState<string>(showers[0].id);

  const handleSelectShower = (showerId: string) => {
    setSelectedShower(showerId);
  };

  const shower = showers.find(
    (shower) => shower.id === selectedShower
  ) as IShower;

  return (
    <div>
      <div>
        <h3>Showers List</h3>
        <ShowerList showers={showers} selectShower={handleSelectShower} />
      </div>
      <hr />
      <SingleShower shower={shower} />
    </div>
  );
};
