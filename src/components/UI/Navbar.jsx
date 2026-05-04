import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🎮 DSA Kids
      </Link>

      <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)}>☰</button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/dashboard">🗺️ Levels</Link>
        <Link to="/leaderboard">🏆 Leaderboard</Link>
        {currentUser ? (
          <>
            <Link to="/profile">👤 {currentUser.displayName || 'Profile'}</Link>
            <button className="btn-primary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-primary">Login</button></Link>
            <Link to="/signup"><button className="btn-secondary">Sign Up</button></Link>
          </>
        )}
        <button className="theme-toggle" onClick={toggle} title="Toggle theme">
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
