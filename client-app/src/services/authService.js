import axios from "axios";
import LocalStorageService from "../services/localstorageService";
import {
  USER_SIGNIN_LOADING,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR
} from "../utils/constants/userConstants";
import swal from 'sweetalert';


const login = (input) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_LOADING,
    payload: input,
  });
  try {
    const { data } = await axios.post('/api/v1/panel/login', input);
    localStorage.setItem('userData',JSON.stringify(data.data.user))
    LocalStorageService._setAccessToken(data.data.accessToken);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data.accessToken });

  } catch (error) {
    dispatch({ type: USER_SIGNIN_ERROR, payload: error.response.data.message });
  }
};

const register = (input) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_LOADING,
    payload: input,
  });
  try {
    const { data } = await axios.post('/api/v1/panel/register', 
      input
    );
    swal({
      title: "Success",
      text:data.message,
      icon: "success",
      button: "Ok",
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data});
  } catch (error) {
    dispatch({ type: USER_REGISTER_ERROR, payload: error.response.data.message });
  }
};

const logout =() =>  async (dispatch) =>{
  LocalStorageService.clearToken();
  dispatch({type:USER_LOGOUT})
}

export { login,register,logout };
