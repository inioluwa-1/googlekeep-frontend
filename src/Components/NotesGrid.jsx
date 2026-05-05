import React from 'react'
import NoteCard from './NoteCard'
import './NotesGrid.css'

const NotesGrid = ({ notes, onEditNote, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <p>No notes yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  )
}

export default NotesGrid
