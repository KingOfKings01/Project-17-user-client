import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const path = import.meta.env.VITE_APP_API + "/booking/";

// Thunk to create a booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(path, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    booking: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
