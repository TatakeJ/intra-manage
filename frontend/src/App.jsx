import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
          <nav>
            <ul className="nav nav-underline">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/home">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admnin_register">Registro</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/table_employees">Tabla de empleados</a>
              </li>
            </ul>
          </nav>
      </header>
    </>
  )
}

export default App
