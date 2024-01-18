import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isLogged = localStorage.getItem("isLogged");
  if(isLogged)
    return  element
  return  <Navigate to="/sign-in" />

};

export default PrivateRoute;
