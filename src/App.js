import {
  Switch,
  Route,
  Routes,
  Router,
  Outlet,
  Navigate,
  useLocation
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
  const location  = useLocation();
  const shouldShowMain = () => {
    const {pathname} = location;
    return !['/sign-in'].includes(pathname);
  }
  return (
    <div className="">
      <Main>
      <Routes>
        {/* <div className=""> */}
          {/* {shouldShowMain() && <Main/>} */}
          {/* <Routes> */}
          <Route exact path="/sign-in" element={<SignIn />} />
          {/* <Route element={(props) => <div>
            {localStorage.getItem("isLogged") !== null ? props.children : <Navigate to={"/sign-in"} />}}
        </div>}> */}
          {/* <Main> */}
            <Route>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/stock" element={<Stock />} />
              <Route exact path="/warehouse" element={<Warehouse />} />
              <Route exact path="/product" element={<Product />} />
              <Route exact path="/store" element={<Store />} />
              <Route exact path="/supplier" element={<Supplier />} />
              <Route exact path="/sale" element={<Sale />} />
              <Route exact path="/movement" element={<Movement />} />
              <Route exact path="/supplying" element={<Supplying />} />
              <Route exact path="/resource" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          {/* </Main> */}
          {/* </Route> */}
          {/* </Routes> */}
        {/* </div> */}

      </Routes>
      </Main>
    </div>
  );
}

// import { useLocation } from "react-router-dom";
// import { Routes, Route, Navigate } from "react-router-dom";

// function App() {
//   const location = useLocation();
//   const [isLogged, setIsLogged] = useState(!!localStorage.getItem("isLogged"));

//   const handleSignIn = () => {
//     // Simulate successful sign-in (replace with your actual authentication logic)
//     localStorage.setItem("isLogged", true);
//     setIsLogged(true);
//   };

//   return (
//     <div className="">
//       <Routes>
//         <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
//         <Route
//           element={isLogged ? (
//             <Main>
//               <Route path="/" element={<Home />} />
//               {/* ... other routes */}
//               <Route exact path="/stock" element={<Stock />} />
//               <Route exact path="/warehouse" element={<Warehouse />} />
//               <Route exact path="/product" element={<Product />} />
//               <Route exact path="/store" element={<Store />} />
//               <Route exact path="/supplier" element={<Supplier />} />
//               <Route exact path="/sale" element={<Sale />} />
//               <Route exact path="/movement" element={<Movement />} />
//               <Route exact path="/supplying" element={<Supplying />} />
//               <Route exact path="/resource" element={<Home />} />
//               <Route path="*" element={<NotFound />} />
//             </Main>
//           ) : (
//             <Navigate to="/sign-in" replace />
//           )}
//         />
//       </Routes>
//     </div>
//   );
// }


export default App;
