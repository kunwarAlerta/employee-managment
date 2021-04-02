import axios from "axios";
import {
  USER_LIST_SUCCESS,
  USER_ERROR,
  USER_SINGLE_SUCCESS,
  USER_LOADING,
  USER_DELETE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_STATUS_UPDATE_SUCCESS,
} from "../utils/constants/userConstants";
import { env } from "../environment/environment";
import { toast } from "react-toastify";
import swal from "sweetalert";

const getUserList = (accessToken, search, pageNumber) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const { data } = await axios.get(
      `${env}/admin/user/all?search=${search}&pageNo=${pageNumber}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    dispatch({ type: USER_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response.data.message });
  }
};

const getSingleUser = (accessToken, userid) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const { data } = await axios.get(`${env}/admin/user/${userid}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    dispatch({ type: USER_SINGLE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response.data.message });
  }
};

const deleteUser = (accessToken, userid) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const { data } = await axios.delete(`${env}/admin/user/delete/${userid}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data.data });
    swal(data.message, {
      icon: "success",
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.message,
    });
  }
};
const updateUser = (accessToken, userid, update) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    var formData = new FormData();

    formData.append("name", update.name);
    formData.append("email", update.email);
    formData.append("phoneNumber", update.phoneNumber);
    formData.append("countryCode", update.countryCode);
    formData.append("address", update.address);
    if (update.baseProfilePic)
      formData.append("baseProfilePic", update.baseProfilePic);
    if (update.gallaryPic0) {
      formData.append("gallaryProfilePic[0]", update.gallaryPic0);
    }
    if (update.gallaryPic1) {
      formData.append("gallaryProfilePic[1]", update.gallaryPic1);
    }
    if (update.gallaryPic2) {
      formData.append("gallaryProfilePic[2]", update.gallaryPic2);
    }
    formData.append("gallaryProfilePic[0]", update.gallaryPic0);
    const { data } = await axios.post(
      `${env}/admin/user/update/${userid}`,
      formData,
      {
        headers: {
          Authorization: accessToken,
          "content-type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.data });
    toast.success("User Updated Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

const activeDeactiveUser = (accessToken, status, userid) => async (
  dispatch
) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const { data } = await axios.post(
      `${env}/admin/user/activedeactive/${userid}`,
      { isActive: status },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    if (status) {
      toast.success("User activated Successfully");
    } else {
      toast.success("User deactivated Successfully");
    }
    dispatch({ type: USER_STATUS_UPDATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

export {
  getUserList,
  getSingleUser,
  deleteUser,
  activeDeactiveUser,
  updateUser,
};
