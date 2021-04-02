
import {
  LOCATION_LOADING,
  LOCATION_ADD_SUCCESS,
  LOCATION_LIST_SUCCESS,
  LOCATION_SINGLE_SUCCESS,
  LOCATION_UPDATE_SUCCESS,
  LOCATION_DELETE_SUCCESS,
  LOCATION_ERROR
  } from "utils/constants/locationConstants";
  
  function locationReducer(
    state = {
      loading: false,
      locations: [],
      location: {},
      redirect: false,
    },
    action
  ) {
    switch (action.type) {
      case LOCATION_LOADING:
        return { ...state, loading: true, redirect: false };
      case LOCATION_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          redirect: false,
          locations: action.payload,
        };
  
      case LOCATION_SINGLE_SUCCESS:
        return {
          ...state,
          loading: false,
          redirect: false,
          location: action.payload,
        };
      case LOCATION_ADD_SUCCESS:
        return {
          ...state,
          loading: false,
          redirect: true,
          locations: [...state.locations, action.payload],
        };
      case LOCATION_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          redirect: true,
          locations: [
            ...state.locations.filter((location) => location._id !== action.payload._id),
            action.payload,
          ],
        };
      case LOCATION_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          redirect: false,
          locations: state.locations.filter((location) => location._id !== action.payload._id),
        };
      case LOCATION_ERROR:
        return {
          ...state,
          redirect: false,
          loading: false,
        };
      default:
        return state;
    }
  }
  
  export { locationReducer };
  