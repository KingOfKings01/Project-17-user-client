import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail";
import ConfirmBooking from "./Pages/ConfirmBooking";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesWithMovies } from "./Store/categoryWithMovieSlice";

function App() {
  const categoriesWithMovies = useSelector((state) => state.categoriesWithMovies.items);
  const categoryStatus = useSelector((state) => state.categoriesWithMovies.status);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategoriesWithMovies());
    }
  }, [categoryStatus, dispatch]);

  if (categoryStatus === 'loading') {
    return <div>Loading...</div>;
  }
  if (categoryStatus === 'error') {
    return <div>Error fetching categories with movies.</div>;
  }
  if (categoriesWithMovies.length === 0) {
    return <div>No categories with movies found.</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/confirm-booking/:token" element={<ConfirmBooking />} />
          <Route path="*" element={<h1>Page not found 404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
