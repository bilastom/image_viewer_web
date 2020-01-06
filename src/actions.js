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

export const uploadImage = (image) => dispatch => {
  dispatch({ type: TYPES.UPLOAD_SUCCESS, payload: image })
}

export const handleError = (error) => dispatch => {
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

export const getImage = (id) => {
  return async (dispatch) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/images/${id}`
      const headers = { 'Authorization': localStorage.getItem('jwt') }
      const res = await axios.get(url, { headers: headers })
      dispatch({ type: TYPES.SELECT_IMAGE, payload: res.data})
    } catch(error) {
      dispatch(handleError(error.response))
    }
  }
}

export const resetImageView = () => dispatch => {
  dispatch({ type: TYPES.RESET_IMAGE_VIEW })
}

export const updateFilename = (image) => {
  return async (dispatch) => {
    try {
      const { filename, id } = image
      const url = `${process.env.REACT_APP_SERVER_URL}/images/${id}`
      const headers = { 'Authorization': localStorage.getItem('jwt') }
      const body = { filename }
      await axios.put(url, body, { headers: headers })
      dispatch({ type: TYPES.UPDATE_IMAGE_STATE, payload: image })
    } catch(error) {
      dispatch(handleError(error.response))
    }
  }
}

export const deleteImage = (id, history) => {
  return async (dispatch) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/images/${id}`
      const headers = { 'Authorization': localStorage.getItem('jwt') }
      await axios.delete(url, { headers })
      history.push('/');
    } catch(error) {
      dispatch(handleError(error.response))
    }
  }
}
