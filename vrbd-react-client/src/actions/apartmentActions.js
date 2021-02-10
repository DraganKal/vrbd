import axios from "axios";
import { GET_APARTMENTS_HOST } from "./types";

export const getApartmentsByHost = () => async (dispatch) => {
  const res = await axios.get("/api/apartments/allByHost");
  dispatch({
    type: GET_APARTMENTS_HOST,
    payload: res.data,
  });
};
