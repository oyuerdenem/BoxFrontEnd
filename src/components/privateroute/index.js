import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from '../layout/Main';

const PrivateRoute = ({ element, ...rest }) => {
  const isLogged = localStorage.getItem("isLogged");
  if(isLogged)
    return  element
  return  <Navigate to="/sign-in" />

};

export default PrivateRoute;
