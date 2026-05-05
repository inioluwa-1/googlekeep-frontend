import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { useToast } from './Components/Toast'
import Navbar from './Components/Navbar.jsx'
import Sidebar from './Components/Sidebar.jsx'
import NoteCreator from './Components/NoteCreator.jsx'
import NotesGrid from './Components/NotesGrid.jsx'
import NoteEditor from './Components/NoteEditor.jsx'
import AuthPage from './pages/AuthPage.jsx'
import notesAPI from './api/notesAPI'
import { getErrorMessage, logError } from './utils/errorHandler'
import './App.css'

function App() {
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [activeSection, setActiveSection] = useState('notes')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setLoading(true)
      
      let archived = false
      let trashed = false
      
      if (activeSection === 'archive') archived = true
      if (activeSection === 'trash') trashed = true

      const fetchedNotes = await notesAPI.getNotes(archived, trashed)
      setNotes(fetchedNotes)
    } catch (err) {
      logError(err, 'App: fetchNotes')
      const message = getErrorMessage(err)
      addToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Load notes when authenticated or section changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes()
    }
  }, [isAuthenticated, activeSection])

  // Filter notes based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNotes(notes)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      )
      setFilteredNotes(filtered)
    }
  }, [notes, searchQuery])

  // Create note
  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await notesAPI.createNote(
        noteData.title,
        noteData.content,
        noteData.color
      )
      // Add note to the beginning of the list
      const noteWithDefaults = {
        ...newNote,
        isArchived: false,
        isTrashed: false,
        labels: newNote.labels || [],
      }
      setNotes([noteWithDefaults, ...notes])
      addToast('Note created successfully', 'success')
    } catch (err) {
      logError(err, 'App: handleCreateNote')
      const message = getErrorMessage(err)
      addToast(message, 'error')
    }
  }

  // Delete/Trash note
  const handleDeleteNote = async (noteId) => {
    try {
      // If in trash, permanently delete; otherwise move to trash
      if (activeSection === 'trash') {
        await notesAPI.deleteNote(noteId)
        setNotes(notes.filter((note) => note._id !== noteId))
        addToast('Note permanently deleted', 'success')
      } else {
        await notesAPI.trashNote(noteId)
        setNotes(notes.filter((note) => note._id !== noteId))
        addToast('Note moved to trash', 'success')
      }
    } catch (err) {
      logError(err, 'App: handleDeleteNote')
      const message = getErrorMessage(err)
      addToast(message, 'error')
    }
  }

  // Edit note
  const handleEditNote = (note) => {
    setEditingNote(note)
  }

  // Save edited note
  const handleSaveEdit = async (updatedData) => {
    try {
      await notesAPI.updateNote(updatedData.id, {
        title: updatedData.title,
        content: updatedData.content,
        color: updatedData.color,
        labels: updatedData.labels,
      })
      
      // Update note in state
      setNotes(
        notes.map((note) =>
          note._id === updatedData.id
            ? {
                ...note,
                title: updatedData.title,
                content: updatedData.content,
                color: updatedData.color,
                labels: updatedData.labels,
              }
            : note
        )
      )
      
      setEditingNote(null)
      addToast('Note updated successfully', 'success')
    } catch (err) {
      logError(err, 'App: handleSaveEdit')
      const message = getErrorMessage(err)
      addToast(message, 'error')
    }
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <div className="app">
      <Navbar onSearch={setSearchQuery} onMenuClick={setActiveSection} />
      
      <div className="app-container">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="main-content">
          <div className="notes-section">
            {activeSection === 'notes' && (
              <>
                <NoteCreator onCreateNote={handleCreateNote} />
                {loading ? (
                  <div className="loading">Loading notes...</div>
                ) : (
                  <NotesGrid
                    notes={filteredNotes}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                )}
              </>
            )}
            {activeSection === 'archive' && (
              <>
                {loading ? (
                  <div className="loading">Loading archived notes...</div>
                ) : (
                  <NotesGrid
                    notes={filteredNotes}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                )}
              </>
            )}
            {activeSection === 'trash' && (
              <>
                {loading ? (
                  <div className="loading">Loading trash...</div>
                ) : (
                  <NotesGrid
                    notes={filteredNotes}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Note Editor Modal */}
      {editingNote && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveEdit}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  )
}

export default App
