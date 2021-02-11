import axios from "axios";
import { GET_APARTMENTS_HOST, GET_ERRORS } from "./types";

export const getApartmentsByHost = () => async (dispatch) => {
  const res = await axios.get("/api/apartments/allByHost");
  dispatch({
    type: GET_APARTMENTS_HOST,
    payload: res.data,
  });
};

export const addApartment = (apartment, history) => async (dispatch) => {
  try {
    await axios.post("/api/apartments", apartment);
    history.push("/myApartments");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
