interface Voter {
  id: number;
  voterId: string;
  voted: boolean;
}

export interface VotersDetailsState {
  voters: Voter[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: VotersDetailsState = {
  voters: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type VotersDetailActions =
  | { type: "FETCH_VOTERS_DETAIL_REQUEST" }
  | { type: "FETCH_VOTERS_DETAIL_SUCCESS"; payload: Voter[] }
  | { type: "FETCH_VOTERS_DETAIL_FAILURE"; payload: string }
  | { type: "ADD_VOTER_SUCCESS"; payload: Voter }
  | { type: "DELETE_VOTER_SUCCESS"; payload: number };

export const reducer = (
  state: VotersDetailsState = initialState,
  action: VotersDetailActions
): VotersDetailsState => {
  switch (action.type) {
    case "FETCH_VOTERS_DETAIL_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_VOTERS_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        voters: action.payload,
      };
    case "FETCH_VOTERS_DETAIL_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_VOTER_SUCCESS":
      return {
        ...state,
        voters: [...state.voters, action.payload],
      };
    case "DELETE_VOTER_SUCCESS":
      return {
        ...state,
        voters: state.voters.filter((voter) => voter.id !== action.payload),
      };
    default:
      return state;
  }
};
