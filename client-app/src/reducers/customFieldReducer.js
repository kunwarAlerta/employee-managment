import {
  CUSTOM_FIELD_LOADING,
  CUSTOM_FIELD_LIST_SUCCESS,
  CUSTOM_FIELD_ERROR,
  CUSTOM_FIELD_ADD_SUCCESS,
  CUSTOM_FIELD_DELETE_SUCCESS,
} from "utils/constants/customFieldConstants";

function customFieldReducer(
  state = { loading: true, customFields: [], redirect: false },
  action
) {
  switch (action.type) {
    case CUSTOM_FIELD_LOADING:
      return { ...state, loading: true, redirect: false };
    case CUSTOM_FIELD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        customFields: action.payload,
      };
    case CUSTOM_FIELD_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        customFields: [...state.customFields, action.payload],
      };
    case CUSTOM_FIELD_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        customFields: state.customFields.filter(
          (customField) => customField._id !== action.payload._id
        ),
      };
    case CUSTOM_FIELD_ERROR:
      return {
        ...state,
        loading: false,
        redirect: false,
        customFields: action.payload,
      };
    default:
      return state;
  }
}

export { customFieldReducer };
