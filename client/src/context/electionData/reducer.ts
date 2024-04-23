import { Election } from "../elections/reducer";

interface Quetion {
  id: number;
  title: string;
  description: string;
}

interface ElectionDetail {
  election: Election;
  quetion: Quetion[];
  totalVoter: number;
}

export interface ElectionsDetailState {
  electionDetail: ElectionDetail;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
const initialData: ElectionDetail = {
  election: {
    id: 5,
    title: "qwerty",
    url: "asdfg",
    launch: false,
    end: false,
  },
  quetion: [
    {
      id: 4,
      title: "Courier",
      description: "Description",
    },
  ],
  totalVoter: 0,
};

export const initialState: ElectionsDetailState = {
  electionDetail: initialData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type ElectionsDetailActions =
  | { type: "FETCH_ELECTIONS_DETAIL_REQUEST" }
  | { type: "FETCH_ELECTIONS_DETAIL_SUCCESS"; payload: ElectionDetail }
  | { type: "FETCH_ELECTIONS_DETAIL_FAILURE"; payload: string }
  | { type: "ADD_QUETION_SUCCESS"; payload: Quetion }
  | { type: "DELETE_QUETION_SUCCESS"; payload: number };

export const reducer = (
  state: ElectionsDetailState = initialState,
  action: ElectionsDetailActions
): ElectionsDetailState => {
  switch (action.type) {
    case "FETCH_ELECTIONS_DETAIL_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ELECTIONS_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        electionDetail: action.payload,
      };
    case "FETCH_ELECTIONS_DETAIL_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_QUETION_SUCCESS":
      return {
        ...state,
        electionDetail: {
          ...state.electionDetail,
          quetion: [...state.electionDetail.quetion, action.payload],
        },
      };
    //   return { ...state, election: state.election.quetion.push(action.payload) };
    case "DELETE_QUETION_SUCCESS":
      return {
        ...state,
        electionDetail: {
          ...state.electionDetail,
          quetion: state.electionDetail.quetion.filter(
            (que) => que.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
