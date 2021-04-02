import {
  USER_SINGLE_SUCCESS,
  USER_LIST_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_STATUS_UPDATE_SUCCESS,
  USER_ERROR,
  USER_LOADING,
} from "../utils/constants/userConstants";

function userReducer(
  state = { loading: true, users: [], metadata: [], redirect: false, user: {} },
  action
) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        redirect: false,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        users: action.payload[0].users,
        metadata: action.payload[0].metadata,
      };
    case USER_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        user: action.payload,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        users: [
          ...state.users.filter((user) => user._id !== action.payload._id),
          action.payload,
        ],
      };
    case USER_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [
          ...state.users.filter((user) => user._id !== action.payload._id),
          action.payload,
        ],
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
    case USER_ERROR:
      return {
        ...state,
        redirect: false,
        loading: false,
      };
    default:
      return state;
  }
}

export { userReducer };
