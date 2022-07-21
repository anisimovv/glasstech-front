import { IShower } from "../../../types";

type Props = {
  showers: IShower[];
};

export const ShowerPicker = ({ showers }: Props) => {
  return (
    <div>
      <button
        type="button"
        // onClick={() => setShowerIndex((showerIndex: number) => showerIndex - 1)}
      >
        Prev
      </button>
      <button
        type="button"
        // onClick={() => setShowerIndex((showerIndex: number) => showerIndex + 1)}
      >
        Next
      </button>
    </div>
  );
};
