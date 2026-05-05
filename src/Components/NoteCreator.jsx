import React, { useState } from 'react'
import './NoteCreator.css'

const NoteCreator = ({ onCreateNote }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [labels, setLabels] = useState([])
  const [labelInput, setLabelInput] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)

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

  const handleCreate = () => {
    if (title.trim() || content.trim()) {
      onCreateNote({ title, content, color, labels })
      setTitle('')
      setContent('')
      setColor('#ffffff')
      setLabels([])
      setLabelInput('')
      setIsExpanded(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setContent('')
    setColor('#ffffff')
    setLabels([])
    setLabelInput('')
    setIsExpanded(false)
    setShowColorPicker(false)
  }

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

  return (
    <div className="note-creator">
      <div className={`creator-card ${isExpanded ? 'expanded' : ''}`} style={{ borderTop: `3px solid ${color}` }}>
        {!isExpanded ? (
          <input
            type="text"
            placeholder="Take a note..."
            className="creator-input"
            onClick={() => setIsExpanded(true)}
            readOnly
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Title"
              className="creator-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <textarea
              placeholder="Take a note..."
              className="creator-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />

            {/* Labels Section */}
            {labels.length > 0 && (
              <div className="creator-labels">
                {labels.map((label) => (
                  <div key={label} className="creator-label-tag">
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
            )}

            {/* Add Label Input */}
            <div className="creator-label-input">
              <input
                type="text"
                placeholder="Add label..."
                className="label-input"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLabel(e)}
              />
              <button className="label-add-btn" onClick={handleAddLabel}>
                +
              </button>
            </div>

            <div className="creator-actions">
              <div className="creator-tools">
                <div className="color-picker-container">
                  <button
                    className="creator-btn"
                    title="Add color"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    🎨
                  </button>
                  {showColorPicker && (
                    <div className="color-picker-dropdown">
                      {colors.map((c) => (
                        <button
                          key={c}
                          className={`color-dot ${color === c ? 'selected' : ''}`}
                          style={{ backgroundColor: c }}
                          onClick={() => {
                            setColor(c)
                            setShowColorPicker(false)
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <button className="creator-btn" title="Add image">
                  🖼️
                </button>
                <button className="creator-btn" title="More options">
                  ⋯
                </button>
              </div>
              <div className="creator-buttons">
                <button className="creator-close-btn" onClick={handleClose}>
                  Close
                </button>
                <button className="creator-save-btn" onClick={handleCreate}>
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NoteCreator

