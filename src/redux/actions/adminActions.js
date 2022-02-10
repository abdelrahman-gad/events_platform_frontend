import Axios from 'axios';

import {
  ADMIN_SIGNIN_FAIL,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNOUT
} from '../constants/AdminConstants'

export const adminSigninAction = (email, password) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/auth/signin`, { email, password });
    console.log(data);
    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('adminInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminSignoutAction = () => (dispatch) => {
  localStorage.removeItem('adminInfo');
  dispatch({ type: ADMIN_SIGNOUT });
};

