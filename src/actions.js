import * as TYPES from './constants/actionTypes'
import axios from 'axios';

export const loginUser = (email, password, history) => {
  
  const params = { user: {email, password }}
  const url = `${process.env.REACT_APP_SERVER_URL}/users/sign_in`
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
      const url = `${process.env.REACT_APP_SERVER_URL}/users/sign_out`
      const headers = { 'Authorization': localStorage.getItem('jwt') }
      await axios.delete(url, headers)
      localStorage.removeItem('jwt');
      dispatch({ type: TYPES.LOGOUT_SUCCESS });
    } catch(error) {
      //TODO
    }
  } 
}

export const handleError = (error) => dispatch => {
  debugger
  if(error.status === 401) {
    localStorage.removeItem('jwt');
    dispatch({ type: TYPES.LOGOUT_SUCCESS });
  } else {
    console.log(error)
  }
}

export const getImages = () => {
  return async (dispatch) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/images`
      const headers = { 'Authorization': localStorage.getItem('jwt') }
      const res = await axios.get(url, { headers: headers })
      dispatch({ type: TYPES.STORE_IMAGES, payload: res.data})
    } catch(error) {
      dispatch(handleError(error.response))
    }
  }
}
