import axios from "axios";
import {
  ADMIN_LOADING,
  ADMIN_ERROR,
  ADMIN_PASSWORD_RESET_SUCCESS,
} from "utils/constants/adminConstants";
import { env } from "../environment/environment";
import { toast } from "react-toastify";

const resetPassword = (accessToken, password, newpassword) => async (
  dispatch
) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  try {
    const { data } = await axios.post(
      `${env}/admin/resetPassword`,
      { password, newpassword },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    dispatch({ type: ADMIN_PASSWORD_RESET_SUCCESS, payload: data.data });
    toast.success(data.message);
  } catch (error) {
    dispatch({ type: ADMIN_ERROR, payload: error.response.data.message });
  }
};
export { resetPassword };
