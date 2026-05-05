import React from 'react'
import './NoteCard.css'

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card" style={{ borderTop: `3px solid ${note.color || '#ffffff'}` }}>
      <div className="note-content">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-text">{note.content}</p>
        
        {/* Display Labels */}
        {note.labels && note.labels.length > 0 && (
          <div className="note-labels">
            {note.labels.map((label) => (
              <span key={label} className="note-label">
                #{label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="note-actions">
        <button className="note-btn" onClick={() => onEdit(note)} title="Edit">
          ✎
        </button>
        <button className="note-btn" onClick={() => onDelete(note._id)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  )
}

export default NoteCard

