import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import PrivateRouter from "./components/PrivateRoute";
import PublicRouter from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/NotFound";
import Register from "./pages/Register";
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
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
