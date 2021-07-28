import {
  LOGOUT_SUCCESS,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
} from "./types/auth";
import { SET_PROFILE_SUCCESS } from "../actions/action_types/users";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  sess: {},
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_WITH_EMAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_WITH_EMAIL_SUCCESS:
      // localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        sess: payload.user,
        current_user: payload.user.email,
        error: null,
      };
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        sess: payload,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: payload, //payload message ovde i razdvoj logout i fail
      };
    default:
      return state;
  }
};
export default authReducer;
