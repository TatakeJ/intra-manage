import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/css/App.css'

function App() {
<<<<<<< HEAD
=======
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
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde
}

export default App
