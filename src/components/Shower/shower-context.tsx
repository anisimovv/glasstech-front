import * as React from "react";

type Action =
  | { type: "setCurrentShowerIndex" }
  | {
      type: "setShowerElementInput";
      payload: { id: string; value: string };
    };
type Dispatch = (action: Action) => void;
type State = { currentShowerIndex: number; showerElementsInput: Record<string, string> };
type ShowerDataProviderProps = { children: React.ReactNode };

const initialstate: State = {
  currentShowerIndex: 0,
  showerElementsInput: {},
};

const ShowerDataContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case "setCurrentShowerIndex":
      return state;

    case "setShowerElementInput":
      return {
        ...state,
        showerElementsInput: {
          ...state.showerElementsInput,
          [action.payload.id]: action.payload.value,
        },
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
