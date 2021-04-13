import {
  EMPLOYEE_LOADING,
  EMPLOYEE_ERROR,
  EMPLOYEE_GET_SUCCESS
  } from "../utils/constants/employeeConstants";
  

function employeeReducer(
  state = {
    loading: false,
    employees: [],
    metadata: [],
    employee: {},
    redirect: false,
  },
  action
) {
  switch (action.type) {
    case EMPLOYEE_LOADING:
      return { ...state, loading: true, redirect: false };
    case EMPLOYEE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        employees: action.payload[0].employees,
        metadata: action.payload[0].metadata,
      };
    case EMPLOYEE_ERROR:
      return {
        ...state,
        redirect: false,
        loading: false,
      };
    default:
      return state;
  }
}

export { employeeReducer };
