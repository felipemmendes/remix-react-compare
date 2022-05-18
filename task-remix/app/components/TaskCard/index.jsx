import { Link, useFetcher } from 'remix'
import { TrashIcon } from '@heroicons/react/solid'
import Loader from '../Loader'

export default function TaskCard({ task }) {
  const fetcher = useFetcher()

  return (
    <li
      key={task.id}
      className={`flex justify-between w-full items-center text-xl p-4 border-b last:border-b-0 border-slate-600 ${
        fetcher.state !== 'idle' ? 'animate-pulse' : ''
      }`}
    >
      <Link to={`${task.id}`} className="hover:text-slate-600">
        {task.name}
      </Link>
      <fetcher.Form
        reloadDocument={false}
        method="delete"
        action={`/tasks/${task.id}/delete`}
      >
        <button
          type="submit"
          className="flex items-center text-red-500 hover:text-red-800"
        >
          {fetcher.state !== 'idle' ? (
            <Loader />
          ) : (
            <>
              <TrashIcon className="h-5 w-5" />
              {fetcher.data && fetcher.data.error && 'Retry'}
            </>
          )}
        </button>
      </fetcher.Form>
    </li>
  )
}
