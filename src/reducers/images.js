import * as TYPES from '../constants/actionTypes'

const initialState = { images: [], selectedImage: null }

export const images = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.FETCH_IMAGES:
      return state
    case TYPES.STORE_IMAGES:
      return {
        ...state,
        images: action.payload
      }
    case TYPES.SELECT_IMAGE:  
      return {
        ...state,
        selectedImage: action.payload
      }
    case TYPES.RESET_IMAGE_VIEW:
      return {
        ...state,
        selectedImage: null
      }
    case TYPES.UPDATE_IMAGE_STATE:
      return {
        ...state,
        selectedImage: action.payload
      }
    case TYPES.UPLOAD_SUCCESS:
      const images = [...state.images, action.payload]
      return{
        ...state,
        images
      }
    default:
      return state
  }
}
