/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Store from "./pages/Store";
import Product from "./pages/Product";
import Storage from "./pages/Storage";
import Resource from "./pages/Resource"
import Withdraw from "./pages/Withdraw"
import Supplier from "./pages/Supplier"

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/product" component={Product}/>
          <Route exact path="/storage" component={Storage}/>
          <Route exact path="/resource" component={Resource}/>
          <Route exact path="/withdraw" component={Withdraw}/>
          <Route exact path="/supplier" component={Supplier}/>
          <Redirect from="*" to="/withdraw" component={Store}/>
        </Main>
      </Switch>
    </div>
  );
}

export default App;
