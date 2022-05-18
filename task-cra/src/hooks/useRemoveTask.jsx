import { useCallback } from 'react'
import { useState } from 'react'
import { CustomError } from '../utils/error'

export function useRemoveTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const removeTask = useCallback(async (taskId) => {
    setError('')
    setLoading(true)
    let success = false

    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
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

  return {
    removeTask,
    loading,
    error,
  }
}
