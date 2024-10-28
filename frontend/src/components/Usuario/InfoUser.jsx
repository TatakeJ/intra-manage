import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
<<<<<<< HEAD
import { FaEdit  } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import img_user from '../imgs/user-icon.png';
import '../css/InfoUser.css'
=======
import '../css/Employee.css'
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde

export const InfoUser = () => {

    const { id } = useParams();
    const [employeesList, setEmployees] = useState([]);

<<<<<<< HEAD
    const updateStateInactive = (val) => {
        Swal.fire({
            title: "<strong>Advertencia</strong>",
            html: `<i>Quieres actualizar el estado del empleado ${val.user_name} a <b>Inactivo?</b></i>`,
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: "No"
        }).then((response) => {
            if (response.isConfirmed) {
                Axios.put('http://localhost:3001/update_state_InA', {
                    id:id,
                    state:'inactivo'
                }).then(() =>{
                    Swal.fire({
                    title: "<strong>Empleado Inactivado</strong>",
                    html: `<i>El estado del empleado ${val.user_name} fue actualizado exitosamente</i>`,
                    icon: "success",
                    timer: 3000
                    }).then(() => {
                        window.location.href = "http://localhost:5173/user/" + id
                    }).catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No fue posible actualizar el estado del empleado!",
                        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
                    });
                    })
                })
            } else {
                Swal.fire({
                    title: "<strong>Denegado</strong>",
                    html: `<i>Proceso cancelado</i>`,
                    icon: "error",
                    timer: 3000
                })
            }
        });
    }

    const updateStateActive = (val) => {
        Axios.put('http://localhost:3001/update_state_A', {
            id:id,
            state:'activo'
        }).then(() =>{
            Swal.fire({
            title: "<strong>Empleado Activado</strong>",
            html: `<i>El estado del empleado ${val.user_name} fue actualizado exitosamente</i>`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
            }).then(() => {
                window.location.href = "http://localhost:5173/user/" + id
            }).catch(function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No fue posible actualizar el estado del empleado!",
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
            });
            })
        })
    }

=======
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde
    useEffect(() => {
        Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployees(response.data);
        });
    }, []);

    return (
<<<<<<< HEAD
        <>
        <div>
            <a className='link_back' href="/table_employees"><TbArrowBackUp /></a>
        </div>
        <div className='cont_info_user container'>
            <div className="card_info_user card">
            {
            employeesList.map((val, key) => {
                var editUser = "http://localhost:5173/edit/" + val.id;
                if (val.id == id) {
                    return (
                        <>
                            <img src={img_user} className="img_user card-img-top" alt="user" />
                            <div className="cardbody_info_user card-body">
                                <p><strong>ID: </strong>{val.id}</p>
                                <p><strong>User Name: </strong>{val.user_name}</p>
                                <p><strong>Email: </strong>{val.email}</p>
                                <div className='container_btns'>
                                    {val.state === "activo" && (
                                        <>
                                            <a href={editUser} type="button" className="btn btn-warning" id='enlaceDinamico'><FaEdit /></a>
                                            <button type="button" onClick={() => {
                                                    updateStateInactive(val);
                                            }} className="btn btn-danger">Inactivar</button>
                                        </>
                                    )} {val.state === "inactivo" && (
                                        <>
                                            <a href={editUser} type="button" className="btn btn-warning" id='enlaceDinamico'><FaEdit /></a>
                                            <button type="button" onClick={() => {
                                                    updateStateActive(val);
                                            }} className="btn btn-success">Activar</button>
                                        </>
                                    )}
                                </div>
                            </div>
=======
        <div>
        {
        employeesList.map((val, key) => {
                if(val.id == id){
                    return (
                        <>
                        <p>ID: {val.id}</p>
                        <p>User Name: {val.user_name}</p>
                        <p>Email: {val.email}</p>
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde
                        </>
                    )
                }
            }
<<<<<<< HEAD
            )}
            </div>
        </div>
        </>
=======
        )
        }
        </div>
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde
    )
}
