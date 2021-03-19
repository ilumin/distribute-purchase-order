import { combineReducers } from 'redux'

import productReducer from './productSlice'

export default combineReducers({
  product: productReducer,
})
