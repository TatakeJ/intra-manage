import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'

export const AdminEditEmplo = () => {

    const { id } = useParams();
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [employeesList, setEmployees] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployees(response.data);
        });
    }, []);

    const editEmployees = (val) => {
        setUser_name(val.user_name);
        setEmail(val.email);
    }

    const update = () => {
        Axios.put('http://localhost:3001/update', {
            id:id,
            user_name:user_name,
            email:email
        }).then(() =>{
            Swal.fire({
            title: "<strong>Empleado editado</strong>",
            html: `<i>El empleado ${user_name} fue editado exitosamente</i>`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
            }).then(() => {
                window.location.href = "http://localhost:5173/table_employees"
            }).catch(function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No fue posible actualizar el empleado!",
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
            });
            })
        })
    }

    return (
    <div className='container'>
        <div className="card text-center">
            <div className="card-header">
                Registro
            </div>
            <div className="card-body">
                {
                    employeesList.map((val, key) => {
                        if(val.id == id){
                            return (
                                <>
                                <form>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">User Name:</span>
                                        <input key={id} onChange={(event) => {
                                            setUser_name(event.target.value)
                                        }}
                                        type="text" name='user_name' value={user_name} className="form-control" placeholder="Ingresa tu nombre" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Email:</span>
                                        <input onChange={(event) => {
                                            setEmail(event.target.value)
                                        }}  
                                        type="email" value={email} className="form-control" placeholder="Ingresa tu email" aria-label="Email" aria-describedby="basic-addon1" />
                                    </div>
                                </form>
                                    <button type="submit" className="btn btn-primary" onClick={() =>{
                                        editEmployees(val)
                                    }}>Datos</button>
                                </>
                            )
                        }
                    }
                )
                }
            </div>
            <div className="card-footer text-body-secondary">
                <div>
                    <button type="submit" className="btn btn-warning" onClick={update}>Actualizar</button>
                    <a href='http://localhost:5173/table_employees' type="submit" className="btn btn-danger">Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    )
}
