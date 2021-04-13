import axios from "axios";
import {
  DASHBOARD_DATA_LOADING,
  DASHBOARD_DATA_SUCCESS,
  DASHBOARD_DATA_ERROR,
} from "../utils/constants/dashboardConstants";
const  accessToken = localStorage.getItem('access_token');

const getDashboardData = () => async (dispatch) => {
  dispatch({
    type: DASHBOARD_DATA_LOADING,
  });
  try {
    const { data } = await axios.get('/api/v1/panel/dashboard/get',{
      headers: {
        Authorization: accessToken,
      },
    });
    dispatch({ type: DASHBOARD_DATA_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: DASHBOARD_DATA_ERROR,
      payload: error.response.data.message,
    });
  }
};

export { getDashboardData };
