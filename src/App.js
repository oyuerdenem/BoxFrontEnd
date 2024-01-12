import { Switch, Route, Redirect } from "react-router-dom";
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


import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/sign-in" exact component={SignIn} />
        <Main>
        <Route exact path="/stock" component={Stock}/>

        <Route exact path="/warehouse" component={Warehouse}/>
        <Route exact path="/product" component={Product}/>
        <Route exact path="/store" component={Store} />
        <Route exact path="/supplier" component={Supplier}/>

        <Route exact path="/sale" component={Sale}/>
        <Route exact path="/movement" component={Movement}/>
        <Route exact path="/supplying" component={Supplying}/>

        <Redirect from="*" to="/product" component={Store}/>
        </Main>
      </Switch>
    </div>
  );
}

export default App;
