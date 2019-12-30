import { combineReducers } from 'redux'

import { authentication } from './reducers/authentication'

const rootReducer = combineReducers({
  authentication
})

export default rootReducer;