import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { TbArrowBackUp } from "react-icons/tb";
import '../css/InfoBills.css'

export const InfoBills = () => {

    const { emplo_id } = useParams();
    const [billsList, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await Axios.get(`http://localhost:3001/bills/${emplo_id}`);
                setBills(response.data);
            } catch (error) {
                console.error("Error fetching bill data:", error);
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No fue posible cargar las facturas!",
                footer: error.message
                });
            }
        };
        fetchBills();
    }, []);

    if (!billsList) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div>
            <a className='link_back' href="/table_employees"><TbArrowBackUp /></a>
        </div>
        <div className='container'>
        {
            billsList.map((bill, key) => {
                return (
                    <>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Factura #{bill.id_bill}</h5>
                                <p><strong>User Name: </strong>{bill.user_name}</p>
                                <p><strong>Reference: </strong>{bill.reference}</p>
                                <p><strong>Amount: </strong>{bill.amount}</p>
                                <p><strong>Full payment: </strong>{bill.full_payment}</p>
                            </div>
                        </div>
                    </>
                )
            }
        )}
        </div>
        </>
    )
}
