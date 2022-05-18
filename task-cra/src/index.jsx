import React from 'react'
import ReactDOM from 'react-dom'
import './tailwind.css'
import Root from './Root'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
