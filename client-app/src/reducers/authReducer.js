import {
  USER_SIGNIN_LOADING,
  USER_LOGOUT,
  USER_SIGNIN_ERROR,
  USER_SIGNIN_SUCCESS,
} from "../utils/constants/userConstants";

function userSigninReducer(state = { loading: true }, action) {
  switch (action.type) {
    case USER_SIGNIN_LOADING:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, authState: action.payload };
    case USER_SIGNIN_ERROR:
      return {
        loading: false,
      };
    case USER_LOGOUT:
      return { loading: false, authState: "" };
    default:
      return state;
  }
}

export { userSigninReducer };
