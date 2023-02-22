import React from 'react'
import { Route, Routes } from 'react-router-dom';
import InvestmentPage from './InvestmentPage';
import DebtPage from './DebtPage';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

const Root = () => {
  return (
    <div>
        <Routes>
          <Route exact path="/" element={LoginPage()} />
          <Route path="/register" element={RegistrationPage()} />
          <Route path="/board" element={DashboardPage()} />
          <Route path="/dashboard" element={<ConnectedPrivateRoute element={<DashboardPage />} />} />
          <Route path="/investments" element={<ConnectedPrivateRoute element={<InvestmentPage />} />} />
          <Route path="/debts" element={<ConnectedPrivateRoute element={<DebtPage />} />} />
        </Routes>
    </div>
  )
}

export default Root