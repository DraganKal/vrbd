import { GET_APARTMENTS_HOST } from "../actions/types";

const initialState = {
  apartments: [],
  apartment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APARTMENTS_HOST:
      return {
        ...state,
        apartments: action.payload,
      };
    default:
      return state;
  }
}
