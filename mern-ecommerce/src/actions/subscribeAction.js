import axios from "axios";
import {
  CLEAR_ERRORS,
  GET_SUBSCRIBE_FAIL,
  GET_SUBSCRIBE_REQUEST,
  GET_SUBSCRIBE_SUCCESS,
  NEW_SUBSCRIBE_FAIL,
  NEW_SUBSCRIBE_REQUEST,
  NEW_SUBSCRIBE_SUCCESS,
} from "../constants/subscribeConstant";

export const createSubscribe = (subscribeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SUBSCRIBE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/addSubscribe`,
      subscribeData,
      config
    );

    dispatch({
      type: NEW_SUBSCRIBE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SUBSCRIBE_FAIL,
      payload: error.message,
    });
  }
};

export const getAllSubscribe = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBSCRIBE_REQUEST });
    const { data } = await axios.get("/api/v1/subscribes");
    dispatch({ type: GET_SUBSCRIBE_SUCCESS, payload: data.subscribe });
  } catch (error) {
    dispatch({
      type: GET_SUBSCRIBE_FAIL,
      payload: error.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
