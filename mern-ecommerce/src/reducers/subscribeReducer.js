import {
  CLEAR_ERRORS,
  GET_SUBSCRIBE_FAIL,
  GET_SUBSCRIBE_REQUEST,
  GET_SUBSCRIBE_SUCCESS,
  NEW_SUBSCRIBE_FAIL,
  NEW_SUBSCRIBE_REQUEST,
  NEW_SUBSCRIBE_RESET,
  NEW_SUBSCRIBE_SUCCESS,
} from "../constants/subscribeConstant";

export const newSubscribeReducer = (state = { subscribe: {} }, action) => {
  switch (action.type) {
    case NEW_SUBSCRIBE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_SUBSCRIBE_SUCCESS:
      return {
        loading: false,
        subscribe: action.payload,
      };
    case NEW_SUBSCRIBE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_SUBSCRIBE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const subscribeAllReducer = (state = { subscribe: [] }, action) => {
  switch (action.type) {
    case GET_SUBSCRIBE_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBSCRIBE_SUCCESS:
      return {
        loading: false,
        subscribe: action.payload,
      };
    case GET_SUBSCRIBE_FAIL:
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
