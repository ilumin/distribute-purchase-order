import { combineReducers } from 'redux'

import locationReducer from './locationSlice'
import productReducer from './productSlice'

export default combineReducers({
  product: productReducer,
  location: locationReducer,
})
