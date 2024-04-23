import React, { createContext, useContext, useReducer } from "react";

// I'll import the reducer, initialState, ElectionsDetailState and ElectionsDetailActions
// from the reducer.ts file
import {
  reducer,
  initialState,
  ElectionsDetailState,
  ElectionsDetailActions,
} from "./reducer";
const ElectionsDetailStateContext = createContext<
  ElectionsDetailState | undefined
>(undefined);

type ElectionsDetailDispatch = React.Dispatch<ElectionsDetailActions>;
const ElectionsDetailDispatchContext = createContext<
  ElectionsDetailDispatch | undefined
>(undefined);

export const ElectionsDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ElectionsDetailStateContext.Provider value={state}>
      <ElectionsDetailDispatchContext.Provider value={dispatch}>
        {children}
      </ElectionsDetailDispatchContext.Provider>
    </ElectionsDetailStateContext.Provider>
  );
};

export const useElectionsDetailState = () =>
  useContext(ElectionsDetailStateContext);

export const useElectionDetailDispatch = () =>
  useContext(ElectionsDetailDispatchContext);
