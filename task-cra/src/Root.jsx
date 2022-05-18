import { Outlet, Route, Routes } from 'react-router-dom'

import TasksListContextProvider from './contexts/TaskListContext'

import Header from './components/Header'
import Home from './pages/Home'
import TaskDetail from './pages/TaskDetail'
import TaskList from './pages/TaskList'

function Index() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex w-full py-10 text-black justify-center">
        <div className="flex flex-col container items-center">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default function Root() {
  return (
    <TasksListContextProvider>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="tasks">
            <Route index element={<TaskList />} />
            <Route path=":taskId" element={<TaskDetail />} />
          </Route>
        </Route>
      </Routes>
    </TasksListContextProvider>
  )
}
