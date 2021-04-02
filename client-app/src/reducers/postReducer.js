import {
  POST_LOADING,
  POST_ADD_SUCCESS,
  POST_LIST_SUCCESS,
  POST_SINGLE_SUCCESS,
  POST_DELETE_SUCCESS,
  POST_UPDATE_SUCCESS,
  POST_ERROR,
} from "utils/constants/postConstants";

function postReducer(
  state = {
    loading: false,
    posts: [],
    metadata: [],
    post: {},
    redirect: false,
  },
  action
) {
  switch (action.type) {
    case POST_LOADING:
      return { ...state, loading: true, redirect: false };
    case POST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        posts: action.payload[0].posts,
        metadata: action.payload[0].metadata,
      };

    case POST_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        post: action.payload,
      };
    case POST_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        posts: [...state.posts, action.payload],
      };
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
        posts: [
          ...state.posts.filter((post) => post._id !== action.payload._id),
          action.payload,
        ],
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: false,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case POST_ERROR:
      return {
        ...state,
        redirect: false,
        loading: false,
      };
    default:
      return state;
  }
}

export { postReducer };
