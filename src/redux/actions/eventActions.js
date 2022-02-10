import Axios from "axios";
import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_SUCCESS,
} from "../constants/eventConstants";

export const listEventsAction = () => async (dispatch, getState) => {
  dispatch({
    type: EVENT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/manager/events`
    );
    const { data: events } = data;
    dispatch({ type: EVENT_LIST_SUCCESS, payload: events });
  } catch (error) {
    dispatch({ type: EVENT_LIST_FAIL, payload: error.message });
  }
};

export const createEventAction = (event) => async (dispatch, getState) => {
  dispatch({ type: EVENT_CREATE_REQUEST });
  const {
    managerSignin: { managerInfo },
  } = getState();
  try {
    console.log(event);
    const { data } = await Axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/manager/events`,
      event,
      {
        headers: { Authorization: `Bearer ${managerInfo.token}` },
      }
    );

    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EVENT_CREATE_FAIL, payload: message });
  }
};

export const deleteEventAction = (eventId) => async (dispatch, getState) => {
  dispatch({ type: EVENT_DELETE_REQUEST, payload: eventId });
  const {
    managerSignin: { managerInfo },
  } = getState();

  try {
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/manager/events/${eventId}`,
      {
        headers: { Authorization: `Bearer ${managerInfo.token}` },
      }
    );
    dispatch({ type: EVENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EVENT_DELETE_FAIL, payload: message });
  }
};
