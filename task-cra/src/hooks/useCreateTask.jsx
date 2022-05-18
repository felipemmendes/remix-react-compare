import { useCallback, useState } from 'react'
import { CustomError } from '../utils/error'

export function useCreateTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createTask = useCallback(async (task) => {
    setError('')
    setLoading(true)
    let success = false

    try {
      const response = await fetch('http://localhost:3001/tasks/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: task }),
      })
      const { error } = await response.json()

      if (error) {
        throw new CustomError({ error, status: response.status })
      }

      success = true
    } catch (e) {
      setError(`${e.status || 500} - ${e.message}`)
    }

    setLoading(false)
    return success
  }, [])

  const clearError = useCallback(() => {
    setError('')
  }, [])

  return {
    createTask,
    loading,
    error,
    clearError,
  }
}
