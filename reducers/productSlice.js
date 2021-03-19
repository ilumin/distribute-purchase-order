import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
    products: [],
    loading: true,
    error: undefined,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct =
        state.products.find((item) => item.id === action.payload) || {}
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

export const { selectProduct } = productSlice.actions

export const productSelector = {
  availableDates: ({ product }) =>
    product.selectedProduct.available_dates || [],
  selectedProduct: ({ product }) => product.selectedProduct,
  allProducts: ({ product }) => product.products,
  isLoading: ({ product }) => product.loading,
}

export default productSlice.reducer
