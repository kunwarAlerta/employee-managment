import axios from "axios";
import LocalStorageService from "../../services/localstorageService";
import swal from 'sweetalert';


const AxiosConfig = () => {
  const localStorageService = LocalStorageService.getService();

  axios.interceptors.request.use(
    (config) => {
      const token = localStorageService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      if (error.response.status === 400) {
        swal({
          title: "Oops",
          text:error.response.data.message,
          icon: "error",
          button: "Ok",
        });
      }
      if (
        error.response.status === 401 &&
        originalRequest.url === `/v1/admin/token`
      ) {
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return axios
          .post("/admin/token", {
            refresh_token: refreshToken,
            
          })
          .then((res) => {
            if (res.status === 201) {
              localStorageService._setAccessToken(res.data.accessToken);
              axios.defaults.headers.common[
                "Authorization"
              ] = localStorageService.getAccessToken();
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );
};

export default AxiosConfig;
