import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import notFoundImg from '../../assets/images/notfoundcat (1).png'
export default () => {
  const history = useHistory();
  return <div className="">
    <img src={notFoundImg} alt="" />
    {/* <h1>not found 404</h1>
    <button onClick={() => history.push("/sign-in")}>
      Sign In
    </button> */}

  </div>
}