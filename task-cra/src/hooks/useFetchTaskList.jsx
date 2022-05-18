import { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { CustomError } from '../utils/error'

export function useFetchTaskList() {
  const [taskList, setTaskList] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTaskList = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const response = await fetch(
        `http://localhost:3001/tasks?search=${query}`
      )
      const { tasks, error } = await response.json()

      if (error) {
        throw new CustomError({ error, status: response.status })
      }

      setTaskList(tasks)
    } catch (e) {
      setError(`${e.status || 500} - ${e.message}`)
      setTaskList([])
    }
    setLoading(false)
  }, [query])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTaskList()
    }, 500)

    return () => clearTimeout(timeout)
  }, [query, fetchTaskList])

  return {
    taskList,
    loading,
    error,
    setQuery,
    refetchTaskList: fetchTaskList,
  }
}
