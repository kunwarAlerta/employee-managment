import {
  SUB_ACTIVITY_LOADING,
  SUB_ACTIVITY_LIST_SUCCESS,
  SUB_ACTIVITY_ADD_SUCCESS,
  SUB_ACTIVITY_SINGLE_SUCCESS,
  SUB_ACTIVITY_UPDATE_SUCCESS,
  SUB_ACTIVITY_DELETE_SUCCESS,
  SUB_ACTIVITY_ERROR,
} from "utils/constants/subActivityConstants";

function subActivityReducer(
  state = {
    loading: true,
    subActivities: [],
    subActivity: {},
    redirect: false,
  },
  action
) {
  switch (action.type) {
    case SUB_ACTIVITY_LOADING:
      return { ...state, loading: true, redirect: false };
    case SUB_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        subActivities: action.payload,
      };

    case SUB_ACTIVITY_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        subActivity: action.payload,
      };
    case SUB_ACTIVITY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        subActivities: [...state.subActivities, action.payload],
      };
    case SUB_ACTIVITY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        subActivities: [
          ...state.subActivities.filter(
            (subActivity) => subActivity._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case SUB_ACTIVITY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        subActivities: state.subActivities.filter(
          (subActivity) => subActivity._id !== action.payload._id
        ),
      };
    case SUB_ACTIVITY_ERROR:
      return {
        ...state,
        redirect: false,
        loading: false,
      };
    default:
      return state;
  }
}

export { subActivityReducer };
