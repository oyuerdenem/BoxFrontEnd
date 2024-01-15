import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Main from "./components/layout/Main";

/** User */
import SignIn from "./pages/SignIn";

/** Stock */
import Stock from "./pages/Stock";

/** Objects */
import Warehouse from "./pages/Warehouse"; //✅
import Product from "./pages/Product"; //✅
import Store from "./pages/Store"; // ✅
import Supplier from "./pages/Supplier"; //✅ delete hiigdehgui baigaa

/** Actions */
import Sale from "./pages/Sale"; //✅ Time tsag minutaar hyzgaarlagdah
import Movement from "./pages/Movement"; //✅
import Supplying from "./pages/Supplying"; //✅

import NotFound from "./pages/NotFound"; //✅
import Home from "./pages/Resource"; //dashboard


import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Fragment, useEffect } from "react";

function App() {
  // useEffect(() => {
  //   if(!localStorage.getItem("islogged")){

  //   }
  // })
  return (
    <>
      <div className="App">
        <Router>
          <Route exact path="/sign-in"   component={SignIn} />
          <Main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/stock" component={Stock} />
              <Route exact path="/warehouse" component={Warehouse} />
              <Route exact path="/product" component={Product} />
              <Route exact path="/store" component={Store} />
              <Route exact path="/supplier" component={Supplier} />
              <Route exact path="/sale" component={Sale} />
              <Route exact path="/movement" component={Movement} />
              <Route exact path="/supplying" component={Supplying} />
              <Route exact path="/resource" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Main>
        </Router>

      </div>
    </>

  );
}

export default App;
