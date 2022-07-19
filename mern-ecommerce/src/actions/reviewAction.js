import axios from "axios";
import {
  ALL_WEB_REVIEW_FAIL,
  ALL_WEB_REVIEW_REQUEST,
  ALL_WEB_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_FAIL_WEB,
  DELETE_REQUEST_WEB,
  DELETE_SUCCESS_WEB,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const createREview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/addReview`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.message,
    });
  }
};
//get review all
export const getAllReviews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_WEB_REVIEW_REQUEST });
    const { data } = await axios.get("/api/v1/getReview");
    dispatch({ type: ALL_WEB_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_WEB_REVIEW_FAIL,
      payload: error.message,
    });
  }
};
//
export const deleteWebReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST_WEB });

    const { data } = await axios.delete(`/api/v1/deleteReview/${id}`);

    dispatch({
      type: DELETE_SUCCESS_WEB,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FAIL_WEB,
      payload: error?.message,
    });
  }
};
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
