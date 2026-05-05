/**
 * Async state hook for handling loading and error states
 */
import { useState, useCallback } from 'react'
import { parseError } from './errorHandler'

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setData(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setStatus('success')
      setData(response)
      return response
    } catch (err) {
      const parsedError = parseError(err)
      setStatus('error')
      setError(parsedError)
      throw err
    }
  }, [asyncFunction])

  return { execute, status, data, error, isLoading: status === 'pending' }
}
