import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Pages/Home"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<h1>Page not found 404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App