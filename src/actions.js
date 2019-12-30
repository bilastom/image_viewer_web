import * as TYPES from './constants/actionTypes'
import axios from 'axios';

export const loginUser = (email, password, history) => {
  
  const params = { user: {email, password }}
  const url = `${process.env.REACT_APP_SERVER_URL}/users/sign_in.json`
  return async (dispatch) => {
    try {
      const res = await axios.post(url, params);
      localStorage.setItem('jwt', res.headers.authorization)
      dispatch({ type: TYPES.LOGIN_SUCCESS, user: res.data });
      history.push('/');
    } catch(error) {
      //TODO
    }
  };
}

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/users/sign_out.json`
      const headers = { 'Authorization': localStorage.getItem('jwt') }
      await axios.delete(url, headers)
      localStorage.removeItem('jwt');
      dispatch({ type: TYPES.LOGOUT_SUCCESS });
    } catch(error) {
      //TODO
    }
  }
}
