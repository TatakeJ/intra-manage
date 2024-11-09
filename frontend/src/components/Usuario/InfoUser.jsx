import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { FaEdit  } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import img_user from '../imgs/user-icon.png';
import '../css/InfoUser.css'
import '../css/Employee.css'

export const InfoUser = () => {

    const { id } = useParams();
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await Axios.get(`http://localhost:3001/employees/${id}`);
                setEmployee(response.data);
                setUser_name(response.data[0].user_name);
                setEmail(response.data[0].email);
                setState(response.data[0].state);
            } catch (error) {
                console.error("Error fetching employee data:", error);
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No fue posible cargar los datos del empleado!",
                footer: error.message
                });
            }
        };
        fetchEmployee();
    }, [id]);
    
    const updateStateInactive = () => {
        Swal.fire({
            title: "<strong>Advertencia</strong>",
            html: `<i>Quieres actualizar el estado del empleado ${user_name} a <b>Inactivo?</b></i>`,
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
                    html: `<i>El estado del empleado ${user_name} fue actualizado exitosamente</i>`,
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
            }
        });
    }

    const updateStateActive = () => {
        Swal.fire({
            title: "<strong>Advertencia</strong>",
            html: `<i>Quieres actualizar el estado del empleado ${user_name} a <b>Activo?</b></i>`,
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: "No"
        }).then((response) => {
            if (response.isConfirmed) {
                Axios.put('http://localhost:3001/update_state_A', {
                    id:id,
                    state:'activo'
                }).then(() =>{
                    Swal.fire({
                    title: "<strong>Empleado Activado</strong>",
                    html: `<i>El estado del empleado ${user_name} fue actualizado exitosamente</i>`,
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
        })
    }

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div>
            <a className='link_back' href="/table_employees"><TbArrowBackUp /></a>
        </div>
        <div className='cont_info_user container'>
            <div className="card_info_user card">
                <img src={img_user} className="img_user card-img-top" alt="user" />
                <div className="cardbody_info_user card-body">
                    <p><strong>ID: </strong>{id}</p>
                    <p><strong>User Name: </strong>{user_name}</p>
                    <p><strong>Email: </strong>{email}</p>
                    <div className='container_btns'>
                        {state === "activo" && (
                            <>
                                <a href= {`http://localhost:5173/edit/${id}`} type="button" className="btn btn-warning" id='enlaceDinamico'><FaEdit /></a>
                                <button type="button" onClick={() => {
                                        updateStateInactive();
                                }} className="btn btn-danger">Desactivar</button>
                            </>
                        )} {state === "inactivo" && (
                            <>
                                <button type="button" onClick={() => {
                                        updateStateActive();
                                }} className="btn btn-success">Activar</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

