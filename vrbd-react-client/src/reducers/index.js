import { combineReducers } from "redux";
import apartmentReducer from "./apartmentReducer";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  user: securityReducer,
  apartment: apartmentReducer,
});
