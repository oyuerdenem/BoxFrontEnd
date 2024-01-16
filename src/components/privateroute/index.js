import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../layout/Main';

export default function PrivateRoute(props) {
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLogged") === null) {
      history.push("/sign-in");
    }
  }, [history]);


  return localStorage.getItem("isLogged") !== null ? <Main>{props.children}</Main> : null;
}
