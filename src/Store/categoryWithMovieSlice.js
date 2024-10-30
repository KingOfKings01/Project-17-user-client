import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const path = import.meta.env.VITE_APP_API + '/categories/';

// Thunks
export const fetchCategoriesWithMovies = createAsyncThunk(
  'categoriesWithMovies/fetchCategoriesWithMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(path);
      return response.data || [];
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

const categoriesWithMoviesSlice = createSlice({
  name: 'categoriesWithMovies',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesWithMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesWithMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategoriesWithMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default categoriesWithMoviesSlice.reducer;
