import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const submitCart = createAsyncThunk(
  'cart/submit',
  async (requestBody) => {
    try {
      const { data } = await axios.post('/api/cart', requestBody)
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total_qty: 0,
    total_price: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { product, location } = action.payload
      const item = {
        id: product.id,
        name: product.name,
        unit_price: product.unit_price,
        qty: location.qty,
        fee: location.fee,
        total_price: product.unit_price * location.qty + location.fee,
      }

      state.items.push(item)
      state.total_qty += item.qty
      state.total_price += item.total_price
    },
    removeItem: (state, action) => {
      const { id } = action.payload
      const removedItem = state.items.find((item) => item.id === id)
      const remainingItems = state.items.filter((item) => item.id !== id)

      state.items = remainingItems
      state.total_qty -= removedItem.qty
      state.total_price -= removedItem.total_price
    },
    updateItem: (state, action) => {
      const { id, qty } = action.payload
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            total_price: item.unit_price * qty + item.fee,
            qty,
          }
        }

        return item
      })

      state.items = updatedItems
      state.total_qty = updatedItems.reduce((acc, cur) => {
        acc += cur.qty
        return acc
      }, 0)
      state.total_price = updatedItems.reduce((acc, cur) => {
        acc += cur.total_price
        return acc
      }, 0)
    },
  },
})

export const { addItem, removeItem, updateItem } = cartSlice.actions

const cart = (state) => state.cart
const selectedProduct = (state) => state.product.selectedProduct
const selectedDate = (state) => state.product.selectedDate
export const cartSelector = {
  cart: createSelector(
    cart,
    selectedProduct,
    selectedDate,
    (cart, product, date) => ({
      ...cart,
      product,
      date,
    })
  ),
}

export default cartSlice.reducer
