import * as TYPES from '../constants/actionTypes'

let jwt = localStorage.getItem('jwt')

const initialState = jwt ? { authenticated: true } : { authenticated: false }

export const authentication = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.LOGIN_USER:
      return {
        logging: true,
      }
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        logging: false,
        authenticated: true
      }
    case TYPES.LOGOUT_USER:
      return {
        ...state,
      }
    case TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false
      }
    default:
      return state
  }
}
