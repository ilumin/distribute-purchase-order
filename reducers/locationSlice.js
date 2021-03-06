import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { addItem, removeItem, submitCart } from './cartSlice'

export const fetchLocations = createAsyncThunk(
  'product/fetchLocations',
  async () => {
    try {
      const { data } = await axios.get('/api/locations')
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    selectedLocations: [],
    locations: [],
    loading: true,
    error: undefined,
  },
  // reducers: {},
  extraReducers: {
    [fetchLocations.pending]: (state) => {
      state.loading = true
    },
    [fetchLocations.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [fetchLocations.fulfilled]: (state, action) => {
      state.loading = false
      state.locations = action.payload
    },
    [addItem.fulfilled]: (state, action) => {
      const { items } = action.payload
      state.selectedLocations = items.map((item) => item.id)
    },
    [submitCart.fulfilled]: (state) => {
      state.selectedLocations = []
    },
    [removeItem]: (state, action) => {
      const { id } = action.payload
      state.selectedLocations = state.selectedLocations.filter(
        (item) => item !== id
      )
    },
  },
})

export const {
  selectLocation,
  removeLocation,
  updateLocationQty,
} = locationSlice.actions

const location = (state) => state.location
const selectedLocationIds = (state) => state.location.selectedLocations
const selectedProduct = (state) => state.product.selectedProduct || {}
export const locationSelector = {
  selectedLocations: createSelector(
    location,
    (location) => location.selectedLocations
  ),
  allLocations: createSelector(
    location,
    selectedLocationIds,
    selectedProduct,
    (location, selectedlocationIds, product) =>
      location.locations.map((item) => ({
        ...item,
        selected: selectedlocationIds.indexOf(item.id) > -1,
        price: product.unit_price,
      }))
  ),
  isLoading: createSelector(location, (location) => location.loading),
}

export default locationSlice.reducer
