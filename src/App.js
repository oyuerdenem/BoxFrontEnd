import {
  Switch,
  Route,
  Routes,
  Router,
  Outlet,
  Navigate
} from "react-router-dom";
import Main from "./components/layout/Main";
import SignIn from "./pages/SignIn";
import Stock from "./pages/Stock";
import Warehouse from "./pages/Warehouse";
import Product from "./pages/Product";
import Store from "./pages/Store";
import Supplier from "./pages/Supplier";
import Sale from "./pages/Sale";
import Movement from "./pages/Movement";
import Supplying from "./pages/Supplying";
import NotFound from "./pages/notfound/NotFound";
import Home from "./pages/Resource";
import PrivateRoute from "./components/privateroute";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useEffect, useState } from "react";

function App() {
  return (
    // <Router>
    <Routes>
      {/* Other top-level routes */}
      <Route path="/sign-in" element={<SignIn />} />

      <Route
        path="/dashboard"
        element={
          localStorage.getItem("isLogged") ? (
            // <Main>
              <Routes>
                <Route path="/dashboard" exact element={<Home />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/warehouse" element={<Warehouse />} />
                <Route path="/product" element={<Product />} />
                <Route path="/store" element={<Store />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/movement" element={<Movement />} />
                <Route path="/supplying" element={<Supplying />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            // </Main>
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
    </Routes>
    // </Router>
  );
}

export default App;
