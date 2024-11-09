import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { BsCheck2 } from "react-icons/bs";
import { TbArrowBackUp } from "react-icons/tb";
import '../css/CreateBill.css'

export const CreateBill = () => {

  const { emplo_id } = useParams();
  const [user_name, setUser_name] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState(0);
  const [payment, setPayment] = useState(0);
  const [employeesList, setEmployee] = useState([]);

  useEffect(() => {
      // Axios.get('http://localhost:3001/employees').then((response) => {
      // setEmployees(response.data);
      // });
    const fetchEmployee = async () => {
      try {
          const response = await Axios.get(`http://localhost:3001/employees/${emplo_id}`);
          setEmployee(response.data);
          setUser_name(response.data[0].user_name);
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
  }, []);

  const addBill = () => {
    if (user_name === '' || reference === '' || amount <= 0 || payment <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No fue posible crear la factura!, completa todos los campos",
      });
    } else {
        Axios.post('http://localhost:3001/crte_bill', {
          user_name: user_name,
          reference: reference,
          amount: amount,
          full_payment: payment,
          emplo_id: emplo_id
        }).then(() => {
          Swal.fire({
            title: "<strong>Factura creada</strong>",
            html: `<i>La factura fue creada exitosamente</i>`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            window.location.href = "http://localhost:5173/bill/" + emplo_id
          })
        }).catch((error) => {
          const errorMessage = error.message === "Network Error" 
            ? "Intente más tarde" 
            : error.response && error.response.data && error.response.data.message
              ? error.response.data.message 
              : "No fue posible crear la factura!";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          });
        });
      };
    }

  return (
    <>
      <div className='cont_create_bill container'>
        <div className="card_crt_bill card">
          <div className="card_header_crt_bill card-header">
          <div className='cont_link_back'>
            <a className='link_back' href="/table_employees"><TbArrowBackUp /></a>
          </div>
            Registro Factura
          </div>
          <div className="card_body_crt_bill card-body">
          <form>
              <div className="cont_inp_bill">
                  <span className="label_form_bill" id="basic-addon1">Nombre:</span>
                  <input onChange={(e) => {
                    setUser_name(e.target.value)
                  }}
                  type="text" value={user_name} className="form-control" placeholder="Ingresa tu nombre" aria-label="Username" aria-describedby="basic-addon1" required/>
                </div>
                <div className="cont_inp_bill">
                  <span className="label_form_bill" id="basic-addon1">Referencia:</span>
                  <input onChange={(e) => {
                    setReference(e.target.value)
                  }}
                  type="text" value={reference} className="form-control" placeholder="Ingresa " aria-label="Reference" aria-describedby="basic-addon1"/>
                </div>
                <div className="cont_inp_bill">
                  <span className="label_form_bill" id="basic-addon1">Cantidad:</span>
                  <input onChange={(event) => {
                    setAmount(event.target.value)
                  }}
                  type="number" value={amount} className="form-control" placeholder="Ingresa la cantidad" aria-label="Amount" aria-describedby="basic-addon1"/>
                </div>
                <div className="cont_inp_bill">
                  <span className="label_form_bill" id="basic-addon1">Pago Total:</span>
                  <input onChange={(event) => {
                    setPayment(event.target.value)
                  }}
                  type="number" value={payment} className="form-control" aria-label="Payment" aria-describedby="basic-addon1"/>
                </div>
            </form>
            <div className="cont_btn_crt_bill text-body-secondary">
                    <button type="submit" className="btn_crt_bill btn btn-primary" onClick={addBill}><BsCheck2 /></button>
                </div>
          </div>
        </div>
      </div>
    </>
  )
}
