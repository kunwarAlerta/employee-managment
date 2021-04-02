import {
  DASHBOARD_DATA_SUCCESS,
  DASHBOARD_DATA_LOADING,
  DASHBOARD_DATA_ERROR,
} from "../utils/constants/dashboardConstants";

function dashboardReducer(state = { loading: true, dashboard: [] }, action) {
  switch (action.type) {
    case DASHBOARD_DATA_LOADING:
      return { loading: true, dashboard: [] };
    case DASHBOARD_DATA_SUCCESS:
      return { loading: false, dashboard: action.payload };
    case DASHBOARD_DATA_ERROR:
      return {
        loading: false,
      };
    default:
      return state;
  }
}

export { dashboardReducer };
