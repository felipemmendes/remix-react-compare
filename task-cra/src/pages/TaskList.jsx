import { SearchIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import TaskCard from '../components/TaskCard'
import { useTaskListContext } from '../contexts/TaskListContext'

export default function TaskList() {
  const { taskList, setQuery, loading, error } = useTaskListContext()

  const [search, setSearch] = useState('')

  useEffect(() => {
    setQuery(search)
  }, [setQuery, search])

  return (
    <>
      <form className="flex h-12 mb-8 mx-auto">
        <label
          htmlFor="search"
          className="flex items-center border border-black w-96 rounded-md h-12 focus-within:ring-1 ring-black"
        >
          <input
            id="search"
            type="text"
            className="px-4 py-2 rounded-md h-full w-full focus-within:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tarefa..."
          />
          <SearchIcon className="text-black w-5 h-5 mr-2" />
        </label>
      </form>
      <div className="pt-4 w-full">
        <>
          {error && <p>{error}</p>}
          {loading ? (
            <Loader />
          ) : (
            <ul className="flex flex-col items-center w-full">
              {taskList.length
                ? taskList.map((task) => <TaskCard key={task.id} task={task} />)
                : 'Sem tarefas'}
            </ul>
          )}
        </>
      </div>
    </>
  )
}
