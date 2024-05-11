import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route,  createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from './components/Home'
import { AdminRegisEmplo } from './components/AdminRegisEmplo'
import { TableEmployees } from './components/TableEmployees'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/admnin_register",
    element: <AdminRegisEmplo/>,
  },
  {
    path: "/table_employees",
    element: <TableEmployees/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
