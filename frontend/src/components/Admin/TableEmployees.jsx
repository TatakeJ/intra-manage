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
    const [billsList, setBills] = useState([]);
    const [filter_employees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeesResponse, billsResponse] = await Promise.all([
                Axios.get('http://localhost:3001/employees'),
                Axios.get('http://localhost:3001/bills')
                ])
                setEmployees(employeesResponse.data)
                setFilteredEmployees(employeesResponse.data)
                setBills(billsResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, []);

    //filtro
    const filterEmployees = (e) => {
        const filter = e.target.value;
        setFilteredEmployees(employeesList.filter(employee => employee.user_name.includes(filter)));
    }

    const hasBill = (employeeId) => {
        return billsList.some(bill => bill.emplo_id === employeeId)
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
                    filter_employees.map((employee) => {
                        var isActive = employee.state === "activo";
                        return (
                        <tr key={employee.id}>
                            <th scope="row">{employee.id}</th>
                            <td>
                                <a className={isActive ? 'active-link' : 'inactive-link'} href={`http://localhost:5173/user/${employee.id}`}>{employee.user_name}</a>
                            </td>
                            <td className="btns_actions">
                                <div className="btns_actions btn-group" role="group">
                                    {employee.state === "activo" && (
                                        <>
                                            <a href={`http://localhost:5173/create_bill/${employee.id}`} type="button" className="btn btn-warning" id='enlaceDinamico'><MdOutlineCreateNewFolder /></a>
                                        </>
                                    )}
                                    {
                                        hasBill(employee.id) && (
                                            <a href={`http://localhost:5173/bill/${employee.id}`} type="button" className="btn btn-info" id='enlaceDinamico'><FaEye /></a>
                                        )
                                    }
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
