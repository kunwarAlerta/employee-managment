import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { userSigninReducer } from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
import { dashboardReducer } from "../reducers/dashboardReducer";
import { adminReducer } from "../reducers/adminReducer";


const authState = localStorage.getItem("access_token");

const initialState = {
  userSignin: { authState },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  dashboardData: dashboardReducer,
  userData: userReducer,
  adminData: adminReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
