import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import '../css/Employee.css'

export const InfoUser = () => {

    const { id } = useParams();
    const [employeesList, setEmployees] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployees(response.data);
        });
    }, []);

    return (
        <div>
        {
        employeesList.map((val, key) => {
                if(val.id == id){
                    return (
                        <>
                        <p>ID: {val.id}</p>
                        <p>User Name: {val.user_name}</p>
                        <p>Email: {val.email}</p>
                        </>
                    )
                }
            }
        )
        }
        </div>
    )
}
