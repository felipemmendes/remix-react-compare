import { json, useActionData } from 'remix'
import { db } from '~/utils/db.server'

export async function action({ request }) {
  const form = await request.formData()
  const name = form.get('name')

  if (!name || typeof name !== 'string') {
    return json(
      { error: 'Task not created: Name is required' },
      { status: 422 }
    )
  }

  const task = await db.task.create({
    data: { name },
  })
  if (!task) {
    return json({ error: 'Task not created', name }, { status: 400 })
  }

  return json({ message: 'Task created', name }, { status: 201 })
}

export default function New() {
  const { error, message } = useActionData()

  return error || message
}
