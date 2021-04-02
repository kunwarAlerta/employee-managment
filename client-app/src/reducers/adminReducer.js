import {
  ADMIN_LOADING,
  ADMIN_PASSWORD_RESET_SUCCESS,
  ADMIN_ERROR,
} from "../utils/constants/adminConstants";

function adminReducer(
  state = { loading: false, modalClose: false, admin: {} },
  action
) {
  switch (action.type) {
    case ADMIN_LOADING:
      return { ...state, loading: true, modalClose: false };
    case ADMIN_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        modalClose: true,
        admin: action.payload,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        modalClose: false,
      };
    default:
      return state;
  }
}

export { adminReducer };
