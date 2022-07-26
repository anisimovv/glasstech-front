import * as React from "react";
import { IBinding, IGlass } from "../../types";

type Action =
  | { type: "setCurrentShowerIndex"; payload: number }
  | {
      type: "setShowerElementInput";
      payload: { id: string; value: string };
    }
  | { type: "setBindingType"; payload: IBinding }
  | { type: "setGlass"; payload: IGlass };
type Dispatch = (action: Action) => void;
type State = {
  currentShowerIndex: number;
  showerElementsInput: Record<string, string>;
  binding: IBinding | null;
  glass: IGlass | null;
};
type ShowerDataProviderProps = { children: React.ReactNode };

const initialstate: State = {
  currentShowerIndex: 0,
  showerElementsInput: {},
  binding: null,
  glass: null,
};

const ShowerDataContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case "setCurrentShowerIndex":
      return { ...state, currentShowerIndex: action.payload };

    case "setShowerElementInput":
      return {
        ...state,
        showerElementsInput: {
          ...state.showerElementsInput,
          [action.payload.id]: action.payload.value,
        },
      };

    case "setBindingType":
      return {
        ...state,
        binding: action.payload,
      };

    case "setGlass":
      return {
        ...state,
        glass: action.payload,
      };

    default: {
      return state;
      // throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ShowerDataProvider({ children }: ShowerDataProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, initialstate);

  const value = { state, dispatch };
  return (
    <ShowerDataContext.Provider value={value}>
      {children}
    </ShowerDataContext.Provider>
  );
}

function useShowerData() {
  const context = React.useContext(ShowerDataContext);
  if (context === undefined) {
    throw new Error("useShowerData must be used within a ShowerDataProvider");
  }
  return context;
}

export { ShowerDataProvider, useShowerData };
