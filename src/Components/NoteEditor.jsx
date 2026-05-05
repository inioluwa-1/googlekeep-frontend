import React, { useState, useEffect } from 'react'
import './NoteEditor.css'

const NoteEditor = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [labels, setLabels] = useState([])
  const [labelInput, setLabelInput] = useState('')
  const [loading, setLoading] = useState(false)

  const colors = [
    '#ffffff', // White
    '#f28482', // Red
    '#f4a261', // Orange
    '#f8e16c', // Yellow
    '#d5e8d4', // Green
    '#a4c2f4', // Blue
    '#d5a6bd', // Purple
    '#e6c3fc', // Light Purple
    '#fce5cd', // Peach
    '#e2efda', // Sage
  ]

  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setContent(note.content || '')
      setColor(note.color || '#ffffff')
      setLabels(note.labels || [])
      setLabelInput('')
    }
  }, [note])

  const handleAddLabel = (e) => {
    e.preventDefault()
    if (labelInput.trim() && !labels.includes(labelInput.trim())) {
      setLabels([...labels, labelInput.trim()])
      setLabelInput('')
    }
  }

  const handleRemoveLabel = (labelToRemove) => {
    setLabels(labels.filter((label) => label !== labelToRemove))
  }

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert('Title or content is required')
      return
    }

    setLoading(true)
    await onSave({
      id: note._id,
      title,
      content,
      color,
      labels,
    })
    setLoading(false)
  }

  return (
    <div className="note-editor-overlay" onClick={onClose}>
      <div className="note-editor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <h2>Edit Note</h2>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="editor-content">
          <input
            type="text"
            placeholder="Title"
            className="editor-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <textarea
            placeholder="Note content"
            className="editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />

          <div className="editor-section">
            <label>Color</label>
            <div className="color-picker">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className="editor-section">
            <label>Labels</label>
            <div className="label-input-container">
              <input
                type="text"
                placeholder="Add a label"
                className="label-input"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLabel(e)}
              />
              <button className="label-add-btn" onClick={handleAddLabel}>
                Add
              </button>
            </div>

            <div className="labels-list">
              {labels.map((label) => (
                <div key={label} className="label-tag">
                  {label}
                  <button
                    className="label-remove-btn"
                    onClick={() => handleRemoveLabel(label)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="editor-actions">
          <button className="editor-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="editor-save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
