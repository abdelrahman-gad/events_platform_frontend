import {
 
  MANAGER_SIGNIN_FAIL,
  MANAGER_SIGNIN_REQUEST,
  MANAGER_SIGNIN_SUCCESS,
  MANAGER_SIGNOUT,
} from '../constants/managerConstants';


export const managerSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case MANAGER_SIGNIN_REQUEST:
      return { loading: true };
    case MANAGER_SIGNIN_SUCCESS:
      return { loading: false, managerInfo: action.payload };
    case MANAGER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case MANAGER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
