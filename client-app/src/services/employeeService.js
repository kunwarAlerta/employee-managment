import axios from "axios";
import { USER_ERROR, USER_SIGNIN_ERROR, USER_SIGNIN_SUCCESS } from "src/utils/constants/userConstants";
import {
EMPLOYEE_LOADING,
EMPLOYEE_ADD_SUCCESS,
EMPLOYEE_ERROR,
EMPLOYEE_GET_SUCCESS
} from "../utils/constants/employeeConstants";
import LocalStorageService from "./localstorageService";

const  accessToken = localStorage.getItem('access_token');

const loginEmployee = (input) => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOADING,
    payload: input,
  });
  try {
    const { data } = await axios.post('/api/v1/panel/employee/login', input);
    localStorage.setItem('userData',JSON.stringify(data.data.user))
    LocalStorageService._setAccessToken(data.data.accessToken);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data.accessToken });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_ERROR, payload: error.response.data.message });
  }
};

const addEmployee = (input) => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOADING,
    payload: input,
  });
  try {
    const { data } = await axios.post('/api/v1/panel/employee/add', input);
    dispatch({ type: EMPLOYEE_ADD_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: EMPLOYEE_ERROR, payload: error.response.data.message });
  }
};



const getEmployees = () => async (dispatch) => {
    dispatch({
      type: EMPLOYEE_LOADING
    });
    try {
      const { data } = await axios.get('/api/v1/panel/employee/list?search=',{
        headers: {
          Authorization: accessToken,
        },
      });
      dispatch({ type: EMPLOYEE_GET_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: EMPLOYEE_ERROR, payload: error.response.data.message });
    }
  };
  

export { addEmployee,getEmployees,loginEmployee};
