import { configureStore } from '@reduxjs/toolkit';
import categoriesWithMoviesReducer from './categoryWithMovieSlice';

const store = configureStore({
  reducer: {
    categoriesWithMovies: categoriesWithMoviesReducer,
  },
});

export default store;
