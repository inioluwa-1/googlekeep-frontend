import React from 'react'
import './Sidebar.css'
import { FileText, Bell, Tag, Archive, Trash2 } from 'lucide-react'

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'labels', label: 'Edit labels', icon: Tag },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon className="sidebar-icon" size={20} />
              <span className="sidebar-label">{item.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
