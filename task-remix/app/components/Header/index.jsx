import { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'remix'
import { Link, NavLink } from 'react-router-dom'

import Loader from '../Loader'
import { PlusIcon } from '@heroicons/react/solid'

export default function Header() {
  const fetcher = useFetcher()
  const formRef = useRef()
  const [error, setError] = useState(false)

  useEffect(() => {
    if (fetcher.state === 'idle' && formRef.current) {
      formRef.current.reset()
    }

    let timeout
    if (fetcher.data && fetcher.data.error) {
      setError(true)
      timeout = setTimeout(() => {
        setError(false)
      }, 3000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
        setError(false)
      }
    }
  }, [fetcher])

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
        <fetcher.Form
          action="/tasks/new"
          method="post"
          reloadDocument={false}
          ref={formRef}
          className={`ml-auto flex rounded-md w-96 h-10 border-black border focus-within:ring-1 ring-black ${
            error && 'ring-2 ring-red-500 border-0'
          }`}
        >
          <input
            type="text"
            id="name"
            name="name"
            className="px-4 py-2 w-full rounded-l-md focus:outline-none"
            placeholder="Nova tarefa..."
          />
          <button
            type="submit"
            disabled={fetcher.state !== 'idle'}
            className="flex items-center justify-center w-16 bg-blue-500 hover:bg-blue-800 text-white leading-[2.5rem] rounded-r-md text-xl disabled:opacity-50"
          >
            {fetcher.state !== 'idle' ? (
              <Loader />
            ) : (
              <PlusIcon className="w-5 h-5" />
            )}
          </button>
        </fetcher.Form>
      </div>
    </header>
  )
}
