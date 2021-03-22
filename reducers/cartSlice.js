import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const submitCart = createAsyncThunk(
  'cart/submit',
  async (_, thunkAPI) => {
    const { items, total_qty } = thunkAPI.getState().cart
    const { selectedDate, selectedProduct } = thunkAPI.getState().product

    const emptyItems = items.length <= 0
    if (emptyItems)
      throw new Error(
        'Please select product, date, and add location with quantity.'
      )

    const exceedLimit = cart.total_qty > selectedDate.max_qty
    if (exceedLimit) {
      throw new Error(
        `Cannot order more than max distribution units (you've just added ${
          total_qty + location.available
        }).`
      )
    }

    const requestBody = {
      date: selectedDate.date,
      product: selectedProduct.id,
      locations: items.map((item) => ({
        id: item.id,
        quantity: item.qty,
      })),
    }
    const { data } = await axios.post('/api/cart', requestBody)
    return data
  }
)

export const addItem = createAsyncThunk(
  'cart/addItem',
  async ({ location }, thunkAPI) => {
    const { items, total_price, total_qty } = thunkAPI.getState().cart
    const { selectedDate, selectedProduct } = thunkAPI.getState().product

    if (location.qty <= 0 || location.qty > location.available) {
      throw new Error(
        `${selectedProduct.name} units in ${location.name} should be grater than 0 and less than ${location.available}.`
      )
    }

    // gaurd
    if (!selectedProduct || !selectedDate) {
      throw new Error('Please select product and date.')
    }

    const locationAlreadyExists =
      items.find((item) => item.id === location.id) !== undefined
    if (locationAlreadyExists) {
      throw new Error('Location already added to cart.')
    }

    const exceedLimit = total_qty + location.qty > selectedDate.max_qty
    if (exceedLimit) {
      throw new Error(
        `Cannot order more than max distribution units (you've just added ${
          total_qty + location.qty
        }).`
      )
    }

    // process
    const item = {
      id: location.id,
      name: location.name,
      unit_price: selectedProduct.unit_price,
      qty: location.qty,
      max_qty: location.available,
      fee: location.fee,
      total_price: selectedProduct.unit_price * location.qty + location.fee,
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
    loading: false,
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
    [addItem.pending]: (state) => {
      state.loading = true
    },
    [addItem.fulfilled]: (state, action) => {
      const { items, total_price, total_qty } = action.payload

      state.loading = false
      state.items = items
      state.total_price = total_price
      state.total_qty = total_qty
    },
    [addItem.rejected]: (state) => {
      state.loading = false
    },
    [submitCart.pending]: (state) => {
      state.loading = true
    },
    [submitCart.fulfilled]: (state) => {
      state.loading = false
      state.items = []
      state.total_price = 0
      state.total_qty = 0
    },
    [submitCart.rejected]: (state) => {
      state.loading = false
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
