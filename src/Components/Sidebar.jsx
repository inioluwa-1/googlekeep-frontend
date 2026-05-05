import React from 'react'
import './Sidebar.css'

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'notes', label: 'Notes', icon: '✎' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' },
    { id: 'labels', label: 'Edit labels', icon: '✏️' },
    { id: 'archive', label: 'Archive', icon: '📦' },
    { id: 'trash', label: 'Trash', icon: '🗑️' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
