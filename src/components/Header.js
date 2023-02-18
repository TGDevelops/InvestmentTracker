import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import { useSelector } from 'react-redux';

const logout = () => {
    
}

const Header = () => {
    const user = useSelector((state) => state);
  return (
    <div>
        <h1 className="title">Financial Planner</h1>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {user && <li>Welcome, {user.displayName}</li>}
            {user && <li><button onClick={logout}>Sign Out</button></li>}
            </ul>
        </nav>
    </div>
  )
}

export default Header;