import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { BsCheck2 } from "react-icons/bs";

export const CreateBill = () => {

  const { emplo_id } = useParams();
  const [user_name, setUser_name] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState(0);
  const [payment, setPayment] = useState(0);
  const [employeesList, setEmployees] = useState([]);

  useEffect(() => {
      Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployees(response.data);
      });
  }, []);
  
  const addBill = () => {
    Axios.post('http://localhost:3001/crte_bill', {
      user_name:user_name,
      reference:reference,
      amount:amount,
      full_payment:payment,
      emplo_id:emplo_id
    }).then(() =>{
      // alert('creado')

      window.location.href = "http://localhost:5173/table_employees"
      
      // cleanInputs();
      // Swal.fire({
      //   title: "<strong>Factura creada</strong>",
      //   html: `<i>La factura fue creada exitosamente</i>`,
      //   icon: "success",
      //   showConfirmButton: false,
      //   timer: 3000
      // })
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No fue posible crear la factura!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
      });
    })
  }

  const cleanInputs = () => {
    setUser_name('');
    setReference('');
    setAmount(0);
    setPayment(0);
  }

  return (
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          Registro
        </div>
        <div className="card-body">
        <form>
          {
            employeesList.map((val, key) => {
              if(val.id == emplo_id){
                return (
                  <>
                  <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Nombre:</span>
                      <input onChange={(event) => {
                        setUser_name(event.target.value)
                      }}
                      type="text" value={user_name} className="form-control" placeholder="Ingresa tu nombre" aria-label="Username" aria-describedby="basic-addon1" required/>
                    </div>
                  </>
                )}})}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Referencia:</span>
                <input onChange={(event) => {
                  setReference(event.target.value)
                }}
                type="text" value={reference} className="form-control" placeholder="Ingresa " aria-label="Reference" aria-describedby="basic-addon1"/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Cantidad:</span>
                <input onChange={(event) => {
                  setAmount(event.target.value)
                }}
                type="number" value={amount} className="form-control" placeholder="Ingresa la cantidad" aria-label="Amount" aria-describedby="basic-addon1"/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Pago Total:</span>
                <input onChange={(event) => {
                  setPayment(event.target.value)
                }}
                type="number" value={payment} className="form-control" aria-label="Payment" aria-describedby="basic-addon1"/>
              </div>
              <div className="text-body-secondary">
                  <button type="submit" className="btn btn-primary" onClick={addBill}><BsCheck2 /></button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}
