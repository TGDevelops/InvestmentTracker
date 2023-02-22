import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import InvestmentPage from './InvestmentPage';
import DebtPage from './DebtPage';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const PrivateRoutes = ({ isAuthenticated }) => (
  <>
    <Route exact path="/" element={LoginPage()} />
    <Route exact path="/register" element={RegistrationPage()} />
    <PrivateRoute
      exact
      path="/dashboard"
      element={DashboardPage()}
      isAuthenticated={isAuthenticated}
    />
    <PrivateRoute
      exact
      path="/investments"
      element={InvestmentPage()}
      isAuthenticated={isAuthenticated}
    />
    <PrivateRoute
      exact
      path="/debts"
      element={DebtPage()}
      isAuthenticated={isAuthenticated}
    />
  </>
);

export default connect(mapStateToProps)(PrivateRoutes);
