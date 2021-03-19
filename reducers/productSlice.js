import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      const { data } = await axios.get('/api/products')
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState: {
    selectedProduct: {},
    selectedDate: {},
    products: [],
    loading: true,
    error: undefined,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct =
        state.products.find((item) => item.id === action.payload) || {}
    },
    clearProduct: (state) => {
      state.selectedProduct = {}
    },
    selectDate: (state, action) => {
      const { id } = action.payload
      state.selectedDate = state.selectedProduct.available_dates.find(
        (item) => item.id === id
      )
    },
    clearDate: (state) => {
      state.selectedDate = {}
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
  },
})

export const {
  selectProduct,
  selectDate,
  clearProduct,
  clearDate,
} = productSlice.actions

const product = (state) => state.product
export const productSelector = {
  availableDates: createSelector(
    product,
    (product) => product.selectedProduct.available_dates || []
  ),
  selectedProduct: createSelector(
    product,
    (product) => product.selectedProduct
  ),
  allProducts: createSelector(product, (product) => product.products),
  isLoading: createSelector(product, (product) => product.loading),
}

export default productSlice.reducer
