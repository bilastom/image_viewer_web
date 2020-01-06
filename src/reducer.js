import { combineReducers } from 'redux'

import { authentication } from './reducers/authentication'
import { images } from './reducers/images'

const rootReducer = combineReducers({
  authentication,
  images
})

export default rootReducer;