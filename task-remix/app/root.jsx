import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'
import Header from './components/Header'
import styles from './tailwind.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export function meta() {
  return {
    description: 'App para salvar tarefas',
  }
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <Layout title="404 | Tarefas">
      <div>
        {caught.status} | {caught.statusText}
      </div>
    </Layout>
  )
}

export default function App() {
  return (
    <Layout title="Tarefas">
      <div className="flex flex-col container items-center">
        <Outlet />
      </div>
    </Layout>
  )
}

export function Layout({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body className="flex flex-col items-center">
        <Header />
        <main className="flex w-full py-10 text-black justify-center">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
