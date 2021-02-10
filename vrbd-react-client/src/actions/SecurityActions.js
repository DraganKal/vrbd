import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, GET_USER, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/SetJWTToken";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
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

export const login = (LoginRequest) => async (dispatch) => {
  try {
    //   post
    const res = await axios.post("/api/users/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in Header
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};

export const getUser = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    history.push("/home");
  }
};

export const updateUser = (id, newUser, history) => async (dispatch) => {
  try {
    await axios.post(`/api/users/${id}/update`, newUser);
    // history.push("/home");
    window.location.reload();
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
