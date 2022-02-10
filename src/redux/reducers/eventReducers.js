const {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_RESET,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_RESET,
} = require("../constants/eventConstants");

export const eventListReducer = (
  state = { loading: true, events: [] },
  action
) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return { loading: true };
    case EVENT_LIST_SUCCESS:
      return { loading: false, events: action.payload };
    case EVENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success:action.payload };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case EVENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
