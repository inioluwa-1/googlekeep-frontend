import axiosInstance from './axiosInstance'

const notesAPI = {
  // Create a new note
  createNote: async (title, content, color = null) => {
    const response = await axiosInstance.post('/notes', {
      title,
      content,
      color,
    })
    return response.data.note
  },

  // Get all notes
  getNotes: async (archived = false, trashed = false) => {
    const response = await axiosInstance.get('/notes', {
      params: {
        archived,
        trashed,
      },
    })
    return response.data.notes
  },

  // Get a single note
  getNoteById: async (id) => {
    const response = await axiosInstance.get(`/notes/${id}`)
    return response.data.note
  },

  // Update a note
  updateNote: async (id, updates) => {
    const response = await axiosInstance.put(`/notes/${id}`, updates)
    return response.data.note
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await axiosInstance.delete(`/notes/${id}`)
    return response.data
  },

  // Archive a note
  archiveNote: async (id) => {
    const response = await axiosInstance.patch(`/notes/${id}/archive`)
    return response.data.note
  },

  // Trash a note
  trashNote: async (id) => {
    const response = await axiosInstance.patch(`/notes/${id}/trash`)
    return response.data.note
  },
}

export default notesAPI
