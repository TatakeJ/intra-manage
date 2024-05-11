import React from 'react'
import {useState} from 'react'
import Axios from 'axios' 
import Swal from 'sweetalert2'

export const TableEmployees = () => {

    const [id, setID] = useState("");
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [employeesList, setEmployees] = useState([]);
    const [edit, setEdit] = useState(false);

    const getEmployees = () => {
        Axios.get('http://localhost:3001/employees', {
        }).then((response) =>{
            setEmployees(response.data)
        })
        }
        
        getEmployees();
        
        //agregar los datos en el from
        const editEmployees = (val) => {
        setEdit(true);
        
        setID(val.id);
        setUser_name(val.user_name);
        setEmail(val.email);
        }
        
        const update = () => {
        Axios.put('http://localhost:3001/update', {
            id:id,
            user_name:user_name,
            email:email
        }).then(() =>{
            cleanInputs();
            Swal.fire({
            title: "<strong>Empleado editado</strong>",
            html: `<i>El empleado ${user_name} fue editado exitosamente</i>`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
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
                cleanInputs();
                Swal.fire({
                title: "Eliminado!",
                text: `${val.user_name} fue eliminado!`,
                icon: "success",
                showConfirmButton: false,
                timer: 3000
                });
            }).catch(function (error) {
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No fue posible eliminar el empleado!",
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
                });
            })
            }
        })
    }

    const cleanInputs = () => {
        setUser_name('');
        setEmail('');
        setEdit(false);
        }

return (
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
            return (
            <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.user_name}</td>
                <td>{val.email}</td>
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                    onClick={() => {
                    editEmployees(val);
                    }}  
                    className="btn btn-info">Edit</button>
                    <button type="button" onClick={() => {
                    deleteEmplo(val);
                    }} className="btn btn-danger">Delete</button>
                </div>  
                </td>
            </tr>
            )
        })
        }
        </tbody>
    </table>
    </div>
)
}
