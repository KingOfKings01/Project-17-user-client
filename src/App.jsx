import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail";
import ConfirmBooking from "./Pages/ConfirmBooking";

function App() {
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
