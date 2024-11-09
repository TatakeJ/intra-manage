import React from 'react'
import {useState} from 'react'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { TbArrowBackUp } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import '../css/RegisEmplo.css'

export const AdminRegisEmplo = () => {

  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setError_email] = useState(null);
  const [password, setPassword] = useState("");
  const [errorPassword, setError_password] = useState(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setError_email(newEmail);
    if (!isValidEmail(newEmail)) {
      setError_email('Correo inválido');
    } else {
      setError_email(null);
    }
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!isValidPassword(newPassword)) {
      setError_password('Debe tener al menos 8 caracteres');
    } else {
      setError_password(null);
    }
  };  

  const add = async () => {
    if(user_name === "" || email === "" || password === ""){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No fue posible agregar el empleado!, completa todos los campos",
        showConfirmButton: false,
        timer: 3000
      });
    } else {
      if (errorEmail === 'Correo inválido' || errorPassword === 'Debe tener al menos 8 caracteres') {
        Swal.fire({
          title: "<strong>Denegado</strong>",
          html: `<i>Correo inválido</i>`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        await Axios.post('http://localhost:3001/create', {
          user_name:user_name,
          email:email,
          password:password,
          state: "activo"
        }).then(() =>{
          Swal.fire({
            title: "<strong>Empleado registrado</strong>",
            html: `<i>El empleado ${user_name} fue registrado exitosamente</i>`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
            }).then(() =>{
              window.location.href = `http://localhost:5173/table_employees`;
            })
        }).catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No fue posible agregar el empleado!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
          });
        })
      }
      
    }
  }

  const cleanInputs = () => {
    setUser_name('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
    <div>
      <a className='link_back' href="/home"><TbArrowBackUp /></a>
    </div>
    <div className='cont_reg_user'>
      <div className="card_reg_user card text-center">
        <div className="card_header_reg_user card-header">
          Registro Usuario
        </div>
        <div className="card-body">
          <form>
            <div className="inp_reg_user input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><FaUser /></span>
              <input onChange={(event) => {
                setUser_name(event.target.value)
              }}
              type="text" value={user_name} className="form-control" placeholder="Nombre usuario" aria-label="Username" aria-describedby="basic-addon1" required/>
            </div>
            <div className="inp_reg_user input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><MdEmail /></span>
              <input onChange={(e) => {
                setEmail(e.target.value)
                handleChangeEmail(e)
              }}
              type="email" value={email} className="form-control" placeholder="Correo" aria-label="Email" aria-describedby="basic-addon1" required/>
            </div>
            {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
            <div className="inp_reg_user input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
              <input onChange={(e) => {
                setPassword(e.target.value)
                handleChangePassword(e)
              }}
              type="password" value={password} className="form-control" placeholder="Contraseña" minLength="8" aria-label="Password" aria-describedby="basic-addon1" required/>
            </div>
            {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
            <div className="cont_btn_reg_user text-body-secondary">
                <button className="btn_reg_user btn btn-primary" onClick={add}>Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
