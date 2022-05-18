import { useCallback, useEffect, useState } from 'react'
import { CustomError } from '../utils/error'

export function useFetchTask(id) {
  const [task, setTask] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTask = useCallback(async (taskId) => {
    setError('')
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`)
      const { task, error } = await response.json()

      if (error) {
        throw new CustomError({ error, status: response.status })
      }

      setTask(task)
    } catch (e) {
      setError(`${e.status || 500} - ${e.message}`)
      setTask(undefined)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTask(id)
  }, [id, fetchTask])

  return {
    task,
    loading,
    error,
  }
}
