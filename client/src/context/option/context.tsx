import React, { createContext, useContext, useReducer } from "react";

import {
  reducer,
  initialState,
  OptionsDetailsState,
  OptionsDetailActions,
} from "./reducer";
const OptionsDetailsStateContext = createContext<
  OptionsDetailsState | undefined
>(undefined);

type OptionsDetailDispatch = React.Dispatch<OptionsDetailActions>;
const OptionsDetailDispatchContext = createContext<
  OptionsDetailDispatch | undefined
>(undefined);

export const OptionsDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OptionsDetailsStateContext.Provider value={state}>
      <OptionsDetailDispatchContext.Provider value={dispatch}>
        {children}
      </OptionsDetailDispatchContext.Provider>
    </OptionsDetailsStateContext.Provider>
  );
};

export const useOptionsDetailsState = () =>
  useContext(OptionsDetailsStateContext);

export const useOptionsDetailDispatch = () =>
  useContext(OptionsDetailDispatchContext);
