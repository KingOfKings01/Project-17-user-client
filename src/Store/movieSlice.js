import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const path = import.meta.env.VITE_APP_API + '/movies/';

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${path}${movieId}`);
      return response.data || {};
    } catch (error) {
        console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    selectedMovie: null,
    status: 'idle',
    error: null,
  },    
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
