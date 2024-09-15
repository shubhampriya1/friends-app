import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page404 from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateRouter from "./components/PrivateRoute";
import PublicRouter from "./components/PublicRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter>
              <Register />
            </PublicRouter>
          }
        />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<></>} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
