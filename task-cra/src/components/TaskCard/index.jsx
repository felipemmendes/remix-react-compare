import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/solid'
import { useRemoveTask } from '../../hooks/useRemoveTask'
import Loader from '../Loader'
import { useTaskListContext } from '../../contexts/TaskListContext'

export default function TaskCard({ task }) {
  const { refetchTaskList } = useTaskListContext()
  const { removeTask, loading, error } = useRemoveTask()

  return (
    <li
      key={task.id}
      className={`flex justify-between w-full items-center text-xl p-4 border-b last:border-b-0 border-slate-600 ${
        loading ? 'animate-pulse' : ''
      }`}
    >
      <Link to={`${task.id}`} className="hover:text-slate-600">
        {task.name}
      </Link>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const success = await removeTask(task.id)
          if (!success) {
            return
          }

          refetchTaskList()
        }}
      >
        <button
          type="submit"
          className="flex items-center text-red-500 hover:text-red-800"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <TrashIcon className="h-5 w-5" />
              {error && 'Retry'}
            </>
          )}
        </button>
      </form>
    </li>
  )
}
