/**
 * Validation utilities
 */

export const validators = {
  // Email validation
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      isValid: emailRegex.test(email),
      error: emailRegex.test(email) ? null : 'Invalid email format',
    }
  },

  // Password validation
  password: (password) => {
    if (password.length < 6) {
      return {
        isValid: false,
        error: 'Password must be at least 6 characters',
      }
    }
    return { isValid: true, error: null }
  },

  // Required field validation
  required: (value) => {
    const isValid = value && value.toString().trim().length > 0
    return {
      isValid,
      error: isValid ? null : 'This field is required',
    }
  },

  // Min length validation
  minLength: (value, min) => {
    const isValid = value && value.length >= min
    return {
      isValid,
      error: isValid ? null : `Must be at least ${min} characters`,
    }
  },

  // Max length validation
  maxLength: (value, max) => {
    const isValid = value && value.length <= max
    return {
      isValid,
      error: isValid ? null : `Must be no more than ${max} characters`,
    }
  },
}

// Validate entire form
export const validateForm = (data, rules) => {
  const errors = {}
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const result = rule(data[field])
      if (!result.isValid) {
        errors[field] = result.error
        isValid = false
        break
      }
    }
  }

  return { isValid, errors }
}
