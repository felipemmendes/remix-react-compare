import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { useFetchTask } from '../hooks/useFetchTask'

export default function TaskDetail() {
  const { taskId } = useParams()
  const { task, loading, error } = useFetchTask(taskId)

  return (
    <div className="flex flex-col">
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {task && <div>{task.name}</div>}
    </div>
  )
}
