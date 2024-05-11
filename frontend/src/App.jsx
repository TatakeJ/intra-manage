import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
          <nav>
              <ul>
                  <li>
                      <a href="/home">Inicio</a>
                  </li>
                  <li>
                      <a href="/admnin_register">Registro</a>
                  </li>
                  <li>
                      <a href="/table_employees">Tabla de empleados</a>
                  </li>
              </ul>
          </nav>
      </header>
    </>
  )
}

export default App
