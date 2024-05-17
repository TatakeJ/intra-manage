import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from './components/Home'
import { AdminRegisEmplo } from './components/Admin/AdminRegisEmplo.jsx'
import { TableEmployees } from './components/Admin/TableEmployees.jsx'
import { AdminEditEmplo } from './components/Admin/AdminEditEmplo.jsx'
import { InfoUser } from './components/Usuario/InfoUser.jsx'
import { Login } from './components/Login.jsx'
import { RegistUser } from './components/Usuario/RegistUser.jsx'
import { CreateBill } from './components/Admin/CreateBill.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/user_register",
    element: <RegistUser/>,
  },
  {
    path: "/admnin_register",
    element: <AdminRegisEmplo/>,
  },
  {
    path: "/table_employees",
    element: <TableEmployees/>,
  },
  {
    path: "/create_bill/:emplo_id",
    element: <CreateBill/>,
  },
  {
    path: "/edit/:id",
    element: <AdminEditEmplo/>,
  },
  {
    path: "/usuario/:id",
    element: <InfoUser/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
