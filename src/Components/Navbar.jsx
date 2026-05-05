import React from 'react'
import './Navbar.css'
import HamburgerMenu from './HamburgerMenu'
import { useAuth } from '../context/AuthContext'
import { Search, Settings, LogOut } from 'lucide-react'

const Navbar = ({ onSearch, onMenuClick }) => {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <HamburgerMenu onMenuClick={onMenuClick} />
          <img 
            src="/logo.png" 
            alt="Google Keep" 
            className="navbar-logo"
          />
          <span className="navbar-title">Keep</span>
        </div>
        
        <div className="navbar-search">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search your notes..." 
            className="search-input"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>

        <div className="navbar-actions">
          {user && (
            <div className="user-info">
              <span className="user-name">{user.firstName} {user.lastName}</span>
            </div>
          )}
          <button className="navbar-btn" title="Settings">
            <Settings size={20} />
          </button>
          <button 
            className="navbar-btn logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar