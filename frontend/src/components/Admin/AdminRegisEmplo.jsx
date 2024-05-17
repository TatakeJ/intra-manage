import React from 'react'
import {useState} from 'react'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import '../css/Employee.css'

export const AdminRegisEmplo = () => {

  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const add = () => {
    Axios.post('http://localhost:3001/create', {
      user_name:user_name,
      email:email,
      password:password
    }).then(() =>{
      cleanInputs();
      Swal.fire({
        title: "<strong>Empleado registrado</strong>",
        html: `<i>El empleado ${user_name}  fue registrado exitosamente</i>`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000
      })
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No fue posible agregar el empleado!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
      });
    })
  }

  const cleanInputs = () => {
    setUser_name('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          Registro
        </div>
        <div className="card-body">
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">User Name:</span>
              <input onChange={(event) => {
                setUser_name(event.target.value)
              }}
              type="text" value={user_name} className="form-control" placeholder="Ingresa tu nombre" aria-label="Username" aria-describedby="basic-addon1" required/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Email:</span>
              <input onChange={(event) => {
                setEmail(event.target.value)
              }}
              type="email" value={email} className="form-control" placeholder="Ingresa tu email" aria-label="Email" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Password:</span>
              <input onChange={(event) => {
                setPassword(event.target.value)
              }}
              type="password" value={password} className="form-control" placeholder="Ingresa tu contraseña" aria-label="Password" aria-describedby="basic-addon1"/>
            </div>
            <div className="text-body-secondary">
                <button type="submit" className="btn btn-primary" onClick={add}>Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
