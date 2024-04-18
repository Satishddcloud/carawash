import { createSlice } from '@reduxjs/toolkit'

export const LocationSlice = createSlice({
  name: 'location',
  initialState: {
    locationData: {},
    location_status: false,
  },
  reducers: {
    setlocation(state, action) {
      state.locationData = action.payload
      state.location_status = true
    },
    clearlocation(state, action) {
      state.locationData = {}
      state.location_status = false
    }
  }
})
export const { setlocation, clearlocation } = LocationSlice.actions;

export default LocationSlice.reducer;