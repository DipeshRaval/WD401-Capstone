interface Quetion {
  id: number;
  title: string;
  description: string;
}

interface Option {
  id: number;
  optionName: string;
  queid: number;
}

interface OptionsDetails {
  quetion: Quetion;
  options: Option[];
}

export interface OptionsDetailsState {
  optionsDetails: OptionsDetails;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
const initialData: OptionsDetails = {
  quetion: {
    id: 4,
    title: "Courier",
    description: "Description",
  },
  options: [],
};

export const initialState: OptionsDetailsState = {
  optionsDetails: initialData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type OptionsDetailActions =
  | { type: "FETCH_OPTIONS_DETAIL_REQUEST" }
  | { type: "FETCH_OPTIONS_DETAIL_SUCCESS"; payload: OptionsDetails }
  | { type: "FETCH_OPTIONS_DETAIL_FAILURE"; payload: string }
  | { type: "ADD_OPTION_SUCCESS"; payload: Option }
  | { type: "DELETE_OPTION_SUCCESS"; payload: number };

export const reducer = (
  state: OptionsDetailsState = initialState,
  action: OptionsDetailActions
): OptionsDetailsState => {
  switch (action.type) {
    case "FETCH_OPTIONS_DETAIL_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_OPTIONS_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        optionsDetails: action.payload,
      };
    case "FETCH_OPTIONS_DETAIL_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_OPTION_SUCCESS":
      return {
        ...state,
        optionsDetails: {
          ...state.optionsDetails,
          options: [...state.optionsDetails.options, action.payload],
        },
      };
    //   return { ...state, election: state.election.quetion.push(action.payload) };
    case "DELETE_OPTION_SUCCESS":
      return {
        ...state,
        optionsDetails: {
          ...state.optionsDetails,
          options: state.optionsDetails.options.filter(
            (option) => option.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
