import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthProtectionHOC = (WrappedComponent) => {
  return (props) => {
    const authToken = Cookies.get('token');

    if (!authToken) {
      // If there is no authentication token, redirect to the login page
      return <Navigate to="/" />;
    } else {
      // Validate the authentication token on your server
      // ...

      // If the authentication token is not valid, redirect to the login page
      // ...

      // If the authentication token is valid, render the protected component
      return <WrappedComponent {...props} />;
    }
  };
};

export default AuthProtectionHOC;
