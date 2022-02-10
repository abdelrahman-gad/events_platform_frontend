import Axios from 'axios';
import {
  MANAGER_SIGNIN_FAIL,
  MANAGER_SIGNIN_REQUEST,
  MANAGER_SIGNIN_SUCCESS,
  MANAGER_SIGNOUT
} from '../constants/managerConstants'

export const managerSigninAction = (email, password) => async (dispatch) => {
  dispatch({ type: MANAGER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/manager/auth/signin`, { email, password });
    dispatch({ type: MANAGER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('managerInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MANAGER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const managerSignoutAction = () => (dispatch) => {
  localStorage.removeItem('managerInfo');
  dispatch({ type: MANAGER_SIGNOUT });
};

