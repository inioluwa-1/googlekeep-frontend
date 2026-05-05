/**
 * Error handling utilities for the application
 */

// Custom error class
export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.name = 'AppError'
  }
}

// Error messages
export const ERROR_MESSAGES = {
  // Auth errors
  AUTH_INVALID_CREDENTIALS: 'Invalid email or password',
  AUTH_EMAIL_EXISTS: 'Email already registered',
  AUTH_REQUIRED_FIELDS: 'All fields are required',
  AUTH_INVALID_EMAIL: 'Invalid email format',
  AUTH_WEAK_PASSWORD: 'Password must be at least 6 characters',
  AUTH_PASSWORDS_DONT_MATCH: 'Passwords do not match',
  AUTH_TOKEN_EXPIRED: 'Session expired. Please login again',
  AUTH_UNAUTHORIZED: 'Unauthorized. Please login',

  // Note errors
  NOTE_NOT_FOUND: 'Note not found',
  NOTE_CREATE_FAILED: 'Failed to create note',
  NOTE_UPDATE_FAILED: 'Failed to update note',
  NOTE_DELETE_FAILED: 'Failed to delete note',
  NOTE_FETCH_FAILED: 'Failed to fetch notes',

  // Network errors
  NETWORK_ERROR: 'Network error. Check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  TIMEOUT: 'Request timeout. Please try again',

  // Generic errors
  UNKNOWN_ERROR: 'Something went wrong. Please try again',
  MISSING_REQUIRED_FIELDS: 'Please fill in all required fields',
}

// Parse error from API response
export const parseError = (error) => {
  // Axios error
  if (error.response) {
    const status = error.response.status
    const data = error.response.data

    return {
      message: data?.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      statusCode: status,
      details: data?.details,
      isClientError: status >= 400 && status < 500,
      isServerError: status >= 500,
    }
  }

  // Network error
  if (error.request) {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      statusCode: 0,
      details: error.message,
      isClientError: false,
      isServerError: true,
    }
  }

  // Other errors
  return {
    message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    statusCode: 0,
    details: null,
    isClientError: false,
    isServerError: true,
  }
}

// Handle API error with user-friendly message
export const getErrorMessage = (error) => {
  const parsed = parseError(error)

  // If it's a 401, user is unauthorized
  if (parsed.statusCode === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
    return ERROR_MESSAGES.AUTH_TOKEN_EXPIRED
  }

  // Return parsed message
  return parsed.message
}

// Log error for debugging
export const logError = (error, context = '') => {
  const timestamp = new Date().toISOString()
  const parsed = parseError(error)

  console.error(`[${timestamp}] Error in ${context}:`, {
    message: parsed.message,
    statusCode: parsed.statusCode,
    details: parsed.details,
    originalError: error,
  })
}

// Check if error is specific type
export const isAuthError = (error) => {
  const parsed = parseError(error)
  return parsed.statusCode === 401 || parsed.statusCode === 403
}

export const isValidationError = (error) => {
  const parsed = parseError(error)
  return parsed.statusCode === 400
}

export const isNotFoundError = (error) => {
  const parsed = parseError(error)
  return parsed.statusCode === 404
}

export const isServerError = (error) => {
  const parsed = parseError(error)
  return parsed.isServerError
}

// Retry logic
export const retryAsync = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }

  throw lastError
}
