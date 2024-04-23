import React, { createContext, useContext, useReducer } from "react";

import {
  reducer,
  initialState,
  VotersDetailsState,
  VotersDetailActions,
} from "./reducer";
const VotersDetailsStateContext = createContext<VotersDetailsState | undefined>(
  undefined
);

type VotersDetailDispatch = React.Dispatch<VotersDetailActions>;
const VotersDetailDispatchContext = createContext<
  VotersDetailDispatch | undefined
>(undefined);

export const VotersDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VotersDetailsStateContext.Provider value={state}>
      <VotersDetailDispatchContext.Provider value={dispatch}>
        {children}
      </VotersDetailDispatchContext.Provider>
    </VotersDetailsStateContext.Provider>
  );
};

export const useVotersDetailsState = () =>
  useContext(VotersDetailsStateContext);

export const useVotersDetailDispatch = () =>
  useContext(VotersDetailDispatchContext);
