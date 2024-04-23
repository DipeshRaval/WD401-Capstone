import React, { createContext, useContext, useReducer } from "react";

// I'll import the reducer, initialState, ElectionsState and ElectionsActions
// from the reducer.ts file
import {
  reducer,
  initialState,
  ElectionsState,
  ElectionsActions,
} from "./reducer";
const ElectionsStateContext = createContext<ElectionsState | undefined>(
  undefined
);

type ElectionsDispatch = React.Dispatch<ElectionsActions>;
const ElectionsDispatchContext = createContext<ElectionsDispatch | undefined>(
  undefined
);

export const ElectionsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Here, I'll use the useReducer hook to manage state. I've passed the `reducer`
  // function and the `initialState` that I've defined in the reducer.ts file.

  const [state, dispatch] = useReducer(reducer, initialState);

  // Then, I'll pass the `state` object as value of this ElectionsStateContext

  return (
    <ElectionsStateContext.Provider value={state}>
      <ElectionsDispatchContext.Provider value={dispatch}>
        {children}
      </ElectionsDispatchContext.Provider>
    </ElectionsStateContext.Provider>
  );
};

export const useElectionsState = () => useContext(ElectionsStateContext);

export const useElectionDispatch = () => useContext(ElectionsDispatchContext);
