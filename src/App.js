import './App.css';
import InvestmentPage from './components/InvestmentPage';
import DebtPage from './components/DebtPage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={LoginPage()} />
          <Route path="/register" element={RegistrationPage()} />
          <Route path="/dashboard" element={DashboardPage()} />
          <Route path="/investments" element={InvestmentPage()} />
          <Route path="/debts" element={DebtPage()} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
