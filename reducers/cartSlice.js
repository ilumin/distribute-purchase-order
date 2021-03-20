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

export const addItem = createAsyncThunk(
  'cart/addItem',
  async ({ product, location }, thunkAPI) => {
    const { items, total_price, total_qty } = thunkAPI.getState().cart
    const { selectedDate, selectedProduct } = thunkAPI.getState().product

    // gaurd
    if (!selectedProduct || !selectedDate) {
      console.log('no product select')
      throw new Error('Please select product and date.')
    }

    const locationAlreadyExists =
      items.find((item) => item.id === location.id) !== undefined
    if (locationAlreadyExists) {
      console.log('location exists')
      throw new Error('Location already added to cart.')
    }

    const exceedLimit = total_qty + location.available > selectedDate.max_qty
    if (exceedLimit) {
      console.log('exceed limit')
      throw new Error(
        `Cannot order more than max distribution units (you've just added ${
          total_qty + location.available
        }).`
      )
    }

    // process
    const item = {
      id: location.id,
      name: location.name,
      unit_price: product.unit_price,
      qty: location.available,
      max_qty: location.available,
      fee: location.fee,
      total_price: product.unit_price * location.available + location.fee,
    }

    const newCart = {
      items: [...items, item],
      total_price: total_price + item.total_price,
      total_qty: total_qty + item.qty,
    }

    return newCart
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
  extraReducers: {
    [addItem.fulfilled]: (state, action) => {
      const { items, total_price, total_qty } = action.payload

      state.items = items
      state.total_price = total_price
      state.total_qty = total_qty
    },
  },
})

export const { removeItem, updateItem } = cartSlice.actions

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
  validation: createSelector(
    cart,
    selectedProduct,
    selectedDate,
    (cart, product, date) => ({
      locationSelect: product !== undefined && date !== undefined,
    })
  ),
}

export default cartSlice.reducer
