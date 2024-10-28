import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { FaEdit  } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import '../css/InfoBills.css'

export const InfoBills = () => {

    const { emplo_id } = useParams();
    const [billsList, setBills] = useState([]);
    // const [find_bills, set_find_bills] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/bills').then((response) => {
        setBills(response.data);
        });
    }, []);

    return (
        <>
        <div>
            <a className='link_back' href="/table_employees"><TbArrowBackUp /></a>
        </div>
        <div className='container'>
            {
            billsList.map((val, key) => {
                if (val.emplo_id == emplo_id) {
                    return (
                        <>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Factura #{val.id_bill}</h5>
                                    {/* <p><strong>ID: </strong>{val.bill_id}</p> */}
                                    <p><strong>User Name: </strong>{val.user_name}</p>
                                    <p><strong>Reference: </strong>{val.reference}</p>
                                    <p><strong>Amount: </strong>{val.amount}</p>
                                    <p><strong>Full payment: </strong>{val.full_payment}</p>
                                    {/* <a href={editUser} type="button" className="btn btn-warning" id='enlaceDinamico'><FaEdit /></a>
                                    <button type="button" onClick={() => {
                                            deleteEmplo(val);
                                    }} className="btn btn-danger"><MdDeleteOutline  /></button> */}
                                </div>
                            </div>
                        </>
                    )
                }
                // if(find_bills.length == 0){
                //     return (
                //         <h1>No se encontraron facturas del empleado</h1>
                //     )
                // }
            }
            )}
        </div>
        </>
    )
}
