import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios' 
import Swal from 'sweetalert2'
<<<<<<< HEAD
import { TbArrowBackUp } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ImSearch } from "react-icons/im";
=======
import { FaEdit  } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineCreateNewFolder } from "react-icons/md";
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde
import '../css/Employee.css'

export const TableEmployees = () => {

    const [employeesList, setEmployees] = useState([]);
<<<<<<< HEAD
    const [filter_users, setFilterUsers] = useState([]);
=======
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde

    useEffect(() => {
        Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployees(response.data);
<<<<<<< HEAD
        setFilterUsers(response.data);
        });
    }, []);

    //filtro
    const filterEmployees = (e) => {
        const filter = e.target.value;
        setFilterUsers(employeesList.filter(employee => employee.user_name.includes(filter)));
    }

    return (
        <>
        <div>
        <a className='link_back' href="/home"><TbArrowBackUp /></a>
        </div>
        <h1 className='title_emplo'><b>EMPLEADOS</b></h1>
        <div className='cont_table_user container'>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><ImSearch /></span>
                <input type="text" onChange={filterEmployees} className="form-control" placeholder="Filtrar Usuario" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className='list_employees'>   
                <table className="table_users table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre Usuario</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    filter_users.map((val, key) => {
                        var infoUser = "http://localhost:5173/user/" + val.id;
                        var createBill = "http://localhost:5173/create_bill/" + val.id;
                        var infoBill = "http://localhost:5173/bill/" + val.id;
                        var isActive = val.state === "activo";
                        return (
                        <tr key={val.id}>
                            <th scope="row">{val.id}</th>
                            <td>
                                <a className={isActive ? 'active-link' : 'inactive-link'} href={infoUser}>{val.user_name}</a>
                            </td>
                            <td className="btns_actions">
                                <div className="btns_actions btn-group" role="group">
                                    {val.state === "activo" && (
                                        <>
                                            <a href={createBill} type="button" className="btn btn-warning" id='enlaceDinamico'><MdOutlineCreateNewFolder /></a>
                                        </>
                                    )}
                                    <a href={infoBill} type="button" className="btn btn-info" id='enlaceDinamico'><FaEye /></a>
                                </div>  
                            </td>
                        </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        </div>
        </>
=======
        });
    }, []);

    const deleteEmplo = (val) => {
        Swal.fire({
            title: "Estas seguro?",
            html: `<i>Realmente desea eliminar a ${val.user_name}?</i>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() =>{
                    Swal.fire({
                        title: "Eliminado!",
                        text: `${val.user_name} fue eliminado!`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.href = "http://localhost:5173/table_employees"
                    })
                }).catch(function (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No fue posible eliminar el empleado!",
                            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
                        });
                })
                React.useEffect(() => {
                    Axios.get('http://localhost:3001/employees').then((response) => {
                    setEmployees(response.data);
                    });
                }, []);
            }
        })
    }

    return (

    <div className='container'>
        <div className='list_employees'>   
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {
                employeesList.map((val, key) => {
                    var infoUser = "http://localhost:5173/usuario/" + val.id;
                    var createBill = "http://localhost:5173/create_bill/" + val.id;
                    var editUser = "http://localhost:5173/edit/" + val.id;
                    return (
                    <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td><a href={infoUser}>{val.user_name}</a></td>
                        <td>{val.email}</td>
                        <td>
                        <div className="btn-group" role="group">
                            <a href={editUser} type="button" className="btn btn-warning" id='enlaceDinamico'><FaEdit /></a>
                            <button type="button" onClick={() => {
                            deleteEmplo(val);
                            }} className="btn btn-danger"><MdDeleteOutline  /></button>
                            <a href={createBill} type="button" className="btn btn-info" id='enlaceDinamico'><MdOutlineCreateNewFolder />
</a>
                        </div>  
                        </td>
                    </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    </div>
>>>>>>> d1571dceeef869ca1ae791ee4be2a8a22e99cfde
    )
}
