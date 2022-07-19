import {
  ALL_WEB_REVIEW_FAIL,
  ALL_WEB_REVIEW_REQUEST,
  ALL_WEB_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_FAIL_WEB,
  DELETE_REQUEST_WEB,
  DELETE_RESET_WEB,
  DELETE_SUCCESS_WEB,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const newREviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        review: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewAllReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_WEB_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case ALL_WEB_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_WEB_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewReducerManagement = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REQUEST_WEB:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SUCCESS_WEB:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_FAIL_WEB:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_RESET_WEB:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};
