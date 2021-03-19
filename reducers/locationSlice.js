import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
  reducers: {
    selectLocation: (state, action) => {
      state.selectedLocations.push(action.payload)
    },
    removeLocation: (state, action) => {
      state.selectedLocations = state.selectedLocations.filter(
        (item) => item.id !== action.payload
      )
    },
    updateLocationQty: (state, action) => {
      const { id, qty } = action.payload
      state.selectedLocations = state.selectedLocations.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty,
          }
        }
        return item
      })
    },
  },
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
  },
})

export const {
  selectLocation,
  removeLocation,
  updateLocationQty,
} = locationSlice.actions

export const locationSelector = {
  selectedLocations: ({ location }) => location.selectedLocations,
  allLocations: ({ location }) => location.locations,
}

export default locationSlice.reducer
