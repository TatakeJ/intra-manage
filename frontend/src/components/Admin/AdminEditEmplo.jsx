import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import '../css/EditEmplo.css'

export const AdminEditEmplo = () => {

    const { id } = useParams();
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await Axios.get(`http://localhost:3001/employees/${id}`);
                setEmployee(response.data);
                setUser_name(response.data[0].user_name);
                setEmail(response.data[0].email);
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

    const update = async () => {
        try {
            const response = await Axios.get(`http://localhost:3001/employees/${id}`);
            if(user_name === response.data[0].user_name && email === response.data[0].email) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Deben ser diferentes datos!"
                });
            } else {
                await Axios.put('http://localhost:3001/update', {
                    id: id,
                    user_name: user_name,
                    email: email
                }).then(() => {
                    Swal.fire({
                        title: "<strong>Empleado editado</strong>",
                        html: `<i>El empleado ${user_name} fue editado exitosamente</i>`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000
                        }).then(() => {
                            window.location.href = `http://localhost:5173/user/${id}`;
                        })
                }).catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No fue posible actualizar el empleado!",
                        footer: error.message
                    });
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No fue posible actualizar el empleado!",
                footer: error.message
            });
        }
    }

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
    <div className='cont_edit_emplo container'>
        <div className="card_edit_emplo card text-center">
            <div className="card_header_edit_emplo card-header">
                Editar Empleado
            </div>
                <div className="card-body">
                    <form>
                        <div className="input-group mb-3">
                            
                            <span className="input-group-text" id="basic-addon1">Nombre:</span>
                            <input key={id} onChange={(e) => {
                                setUser_name(e.target.value)
                            }}
                            type="text" name='user_name' value={user_name} className="form-control" placeholder="Ingresa tu nombre" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Correo:</span>
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }}  
                            type="email" value={email} className="form-control" placeholder="Ingresa tu email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                    </form>
                </div>
                <div className="card_footer_edit_emplo card-footer text-body-secondary">
                    <div>
                        <button type="submit" className="btn btn-warning" onClick={update}>Actualizar</button>
                        <a href={'http://localhost:5173/user/' + id} type="submit" className="btn btn-danger">Cancelar</a>
                    </div>
                </div>
        </div>    
    </div>
    )
}
