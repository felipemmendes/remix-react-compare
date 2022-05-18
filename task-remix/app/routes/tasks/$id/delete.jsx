import { json, redirect } from 'remix'
import { db } from '~/utils/db.server'

export async function action({ request, params }) {
  const { id } = params

  await db.task.delete({
    where: { id },
  })

  if (request.method === 'POST') {
    return redirect('/tasks')
  }

  return json({ message: 'Task deleted' }, { status: 202 })
}
