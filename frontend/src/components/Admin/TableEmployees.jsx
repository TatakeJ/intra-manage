import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { TbArrowBackUp } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import '../css/Employee.css'

export const TableEmployees = () => {

    const [employeesList, setEmployees] = useState([]);
    const [filter_users, setFilterUsers] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployees(response.data);
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
    )
}
