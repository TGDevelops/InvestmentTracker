import React from 'react'
import { Route, Routes } from 'react-router-dom';
import InvestmentPage from './InvestmentPage';
import DebtPage from './DebtPage';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import AuthProtectionHOC from './AuthProtectionHOC';

const Root = () => {
  return (
    <div>
        <Routes>
          <Route exact path="/" element={LoginPage()} />
          <Route path="/register" element={RegistrationPage()} />
          <Route path="/dashboard" element={DashboardPage()} />
          <Route path="/investments" element={InvestmentPage()} />
          <Route path="/debts" element={DebtPage()} />
        </Routes>
    </div>
  )
}

export default Root