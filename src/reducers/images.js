import * as TYPES from '../constants/actionTypes'

const initialState = { images: [] }

export const images = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.FETCH_IMAGES:
      return state
    case TYPES.STORE_IMAGES:
      return {
        ...state,
        images: action.payload
      }
    default:
      return state
  }
}
