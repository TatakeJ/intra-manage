import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { FaEdit  } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineCreateNewFolder } from "react-icons/md";
import '../css/Employee.css'

export const TableEmployees = () => {

    const [employeesList, setEmployees] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployees(response.data);
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
    )
}
