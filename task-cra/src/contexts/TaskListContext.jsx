import { createContext, useContext } from 'react'
import { useFetchTaskList } from '../hooks/useFetchTaskList'

const TaskListContext = createContext()

export default function TasksListContextProvider({ children }) {
  const { taskList, refetchTaskList, setQuery, error, loading } =
    useFetchTaskList()

  return (
    <TaskListContext.Provider
      value={{ taskList, refetchTaskList, setQuery, error, loading }}
    >
      {children}
    </TaskListContext.Provider>
  )
}

export function useTaskListContext() {
  const context = useContext(TaskListContext)

  return context
}
