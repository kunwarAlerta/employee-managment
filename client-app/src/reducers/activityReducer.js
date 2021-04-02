import {
  ACTIVITY_LOADING,
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_ADD_SUCCESS,
  ACTIVITY_SINGLE_SUCCESS,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_UPDATE_SUCCESS,
  ACTIVITY_ERROR,
} from "utils/constants/activityContants";

function activityReducer(
  state = { loading: true, activities: [], redirect: false, activity: {} },
  action
) {
  switch (action.type) {
    case ACTIVITY_LOADING:
      return { ...state, redirect: false, loading: true };
    case ACTIVITY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        activities: [...state.activities, action.payload],
      };
    case ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        activities: action.payload,
      };
    case ACTIVITY_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        activity: action.payload,
      };
    case ACTIVITY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        activities: [
          ...state.activities.filter(
            (activity) => activity._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case ACTIVITY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        activities: state.activities.filter(
          (activity) => activity._id !== action.payload._id
        ),
      };
    case ACTIVITY_ERROR:
      return {
        ...state,
        redirect: false,
        loading: false,
      };
    default:
      return state;
  }
}

export { activityReducer };
