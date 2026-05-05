import React, { useState } from 'react'
import './HamburgerMenu.css'

const HamburgerMenu = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (item) => {
    if (onMenuClick) onMenuClick(item)
    setIsOpen(false)
  }

  return (
    <div className="hamburger-menu">
      <button
        onClick={toggleMenu}
        className="hamburger-btn"
      >
        <span className={`hamburger-line ${isOpen ? 'line1-active' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'line2-active' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'line3-active' : ''}`}></span>
      </button>

      {isOpen && (
        <div className="hamburger-overlay" onClick={() => setIsOpen(false)}>
          <div className="hamburger-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="hamburger-close">
              ✕
            </button>
            <ul className="hamburger-list">
              <li>
                <button onClick={() => handleMenuItemClick('notes')}>📝 Notes</button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick('reminders')}>🔔 Reminders</button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick('archive')}>📦 Archive</button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick('trash')}>🗑️ Trash</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu