import React, { createContext, useState, useContext } from 'react'
import axiosInstance from '../api/axiosInstance'
import { getErrorMessage, logError } from '../utils/errorHandler'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
      } catch (err) {
        logError(err, 'AuthContext: Loading user from localStorage')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }, [])

  const signup = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.post('/auth/signup', userData)
      const { user, token } = response.data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      setUser(user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (err) {
      const message = getErrorMessage(err)
      logError(err, 'AuthContext: signup')
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.post('/auth/login', { email, password })
      const { user, token } = response.data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      setUser(user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (err) {
      const message = getErrorMessage(err)
      logError(err, 'AuthContext: login')
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('notes')
    setUser(null)
    setIsAuthenticated(false)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
