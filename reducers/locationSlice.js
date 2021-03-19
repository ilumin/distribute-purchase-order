import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { addItem, removeItem } from './cartSlice'

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
    [addItem]: (state, action) => {
      const { location } = action.payload
      state.selectedLocations.push(location)
    },
    [removeItem]: (state, action) => {
      const { id } = action.payload
      state.selectedLocations = state.selectedLocations.filter(
        (item) => item.id !== id
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
export const locationSelector = {
  selectedLocations: createSelector(
    location,
    (location) => location.selectedLocations
  ),
  allLocations: createSelector(location, (location) => location.locations),
  isLoading: createSelector(location, (location) => location.loading),
}

export default locationSlice.reducer
