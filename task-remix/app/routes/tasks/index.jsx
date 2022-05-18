import { json, useSubmit, useLoaderData, Form, useTransition } from 'remix'
import { SearchIcon } from '@heroicons/react/solid'

import Loader from '~/components/Loader'
import TaskCard from '~/components/TaskCard'
import { db } from '~/utils/db.server'

export function meta() {
  return {
    title: 'Lista | Tarefas',
  }
}

export async function loader({ request }) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || ''

  if (typeof search !== 'string') {
    return json({ error: 'Houve um erro na requisição' }, { status: 422 })
  }

  const tasks = await db.task.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return json({ tasks, search })
}

export default function TaskList() {
  const { tasks, search, error } = useLoaderData()
  const transition = useTransition()
  const submit = useSubmit()

  return (
    <>
      <Form
        method="get"
        className="flex h-12 mb-8 mx-auto"
        onChange={(e) => submit(e.currentTarget)}
        reloadDocument={false}
      >
        <label
          htmlFor="search"
          className="flex items-center border border-black w-96 rounded-md h-12 focus-within:ring-1 ring-black"
        >
          <input
            id="search"
            name="search"
            type="text"
            className="px-4 py-2 rounded-md h-full w-full focus-within:outline-none"
            placeholder="Buscar tarefa..."
            defaultValue={search}
          />
          <button type="submit">
            <SearchIcon className="text-black w-5 h-5 mr-2" />
          </button>
        </label>
      </Form>
      <div className="flex flex-col items-center pt-4 w-full">
        {error && <p>{error}</p>}
        {transition.state !== 'idle' ? (
          <Loader />
        ) : (
          <ul className="flex flex-col items-center w-full">
            {tasks && tasks.length
              ? tasks.map((task) => <TaskCard key={task.id} task={task} />)
              : 'Sem tarefas'}
          </ul>
        )}
      </div>
    </>
  )
}
