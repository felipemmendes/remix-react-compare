import { json, useCatch, useLoaderData } from 'remix'
import { db } from '~/utils/db.server'

export function meta({ data }) {
  let title

  if (!data) {
    title = 404
  } else {
    title = data.task.name
  }

  return {
    title: `${title} | Tarefas`,
  }
}

export async function loader({ params }) {
  const { id } = params

  const task = await db.task.findUnique({
    where: { id },
  })
  if (!task) {
    throw json({ error: 'Tarefa não encontrada' }, { status: 404 })
  }

  return json({ task }, { status: 200 })
}

export default function TaskId() {
  const { task } = useLoaderData()

  return <div className="flex flex-col">{task && <div>{task.name}</div>}</div>
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div className="flex flex-col">
      <p>{caught.data.error}</p>
    </div>
  )
}
