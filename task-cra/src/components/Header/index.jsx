import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/solid'

import { useTaskListContext } from '../../contexts/TaskListContext'
import { useCreateTask } from '../../hooks/useCreateTask'
import Loader from '../../components/Loader'

export default function Header() {
  const { refetchTaskList } = useTaskListContext()
  const { createTask, loading, error, clearError } = useCreateTask()

  const [task, setTask] = useState('')

  return (
    <header className="flex justify-center w-full h-16 border-b text-black">
      <div className="flex items-center container">
        <Link to="/" className="text-2xl font-bold mr-16 hover:text-slate-600">
          Minhas Tarefas
        </Link>
        <nav className="flex gap-4 justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'font-bold' : ''} hover:text-slate-600`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${isActive ? 'font-bold' : ''} hover:text-slate-600`
            }
          >
            Tarefas
          </NavLink>
        </nav>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            const success = await createTask(task)

            if (!success) {
              return
            }

            setTask('')
            refetchTaskList()
          }}
          className={`ml-auto flex rounded-md w-96 h-10 border-black border focus-within:ring-1 ring-black ${
            error && 'ring-2 ring-red-500 border-0'
          }`}
        >
          <input
            type="text"
            className="px-4 py-2 w-full rounded-l-md focus:outline-none"
            value={task}
            placeholder="Nova tarefa..."
            onChange={(e) => {
              clearError()
              setTask(e.target.value)
            }}
            onFocus={clearError}
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-16 bg-blue-500 hover:bg-blue-800 text-white leading-[2.5rem] rounded-r-md border border-l-0 border-black text-xl disabled:opacity-50"
          >
            {loading ? <Loader /> : <PlusIcon className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </header>
  )
}
