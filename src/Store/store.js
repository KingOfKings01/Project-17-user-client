import { configureStore } from '@reduxjs/toolkit';
import categoriesWithMoviesReducer from './categoryWithMovieSlice';
import movieReducer from './movieSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    categoriesWithMovies: categoriesWithMoviesReducer,
  },
});

export default store;
