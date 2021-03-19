import { combineReducers } from 'redux'

import cartReducer from './cartSlice'
import locationReducer from './locationSlice'
import productReducer from './productSlice'

export default combineReducers({
  product: productReducer,
  location: locationReducer,
  cart: cartReducer,
})
