import { useGetGlass } from "../../../hooks/api/useGetGlass";
import { useGetShowers } from "../../../hooks/api/useGetShowers";

import { ShowerDataProvider, useShowerData } from "../shower-context";

import ShowerForm from "../ShowerForm";
import ShowerPicker from "../ShowerPicker";
import ShowerSkeleton from "../ShowerSkeleton";
import TotalPrice from "../TotalPrice";

const ShowerCalculatorComponent = () => {
  const { showers } = useGetShowers();
  const { glass } = useGetGlass();
  const { state } = useShowerData();

  const loading = !showers || !glass;

  if (loading) {
    return <ShowerSkeleton />;
  }

  const shower = showers[state.currentShowerIndex];

  return (
    <div className="flex flex-col sm:flex-row max-w-[600px] mx-4 sm:mx-auto mt-[-100px] mb-6 bg-slate-50 rounded-lg drop-shadow-lg">
      <div className="flex flex-col sm:w-[240px] shrink-0 bg-white rounded-lg">
        <h1 className="mx-4 mt-8 text-2xl text-slate-900">{shower.name}</h1>

        <div className="flex-grow">
          <ShowerPicker shower={shower} />
        </div>
        <TotalPrice shower={shower} />
      </div>
      <ShowerForm shower={shower} glass={glass} />
    </div>
  );
};

export const ShowerCalculator = () => {
  return (
    <ShowerDataProvider>
      <ShowerCalculatorComponent />
    </ShowerDataProvider>
  );
};
