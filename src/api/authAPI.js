import axiosInstance from './axiosInstance'

const authAPI = {
  // Sign up
  signup: async (firstName, lastName, email, password) => {
    const response = await axiosInstance.post('/auth/signup', {
      firstName,
      lastName,
      email,
      password,
    })
    return response.data
  },

  // Login
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  // Get profile
  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile')
    return response.data
  },
}

export default authAPI
