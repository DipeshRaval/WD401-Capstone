export interface Election {
  id: number;
  title: string;
  url: string;
  launch: boolean;
  end: boolean;
}

export interface ElectionsState {
  elections: Election[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: ElectionsState = {
  elections: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then I'll define a new type called `ElectionsActions`
// for all possible combimations of action objects.

export type ElectionsActions =
  | { type: "FETCH_ELECTIONS_REQUEST" }
  | { type: "FETCH_ELECTIONS_SUCCESS"; payload: Election[] }
  | { type: "FETCH_ELECTIONS_FAILURE"; payload: string }
  | { type: "ADD_ELECTION_SUCCESS"; payload: Election }
  | { type: "DELETE_ELECTION_SUCCESS"; payload: number };

export const reducer = (
  state: ElectionsState = initialState,
  action: ElectionsActions
): ElectionsState => {
  switch (action.type) {
    case "FETCH_ELECTIONS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ELECTIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        elections: action.payload,
      };
    case "FETCH_ELECTIONS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_ELECTION_SUCCESS":
      return { ...state, elections: [...state.elections, action.payload] };
    case "DELETE_ELECTION_SUCCESS":
      return {
        ...state,
        elections: state.elections.filter(
          (election) => election.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
