import React from 'react'
import './css/Home.css'
import 'bootstrap/js/dist/dropdown'
import { IoMenu } from "react-icons/io5";
import jacket_1 from './imgs/Jacket_1.png'
import jacket_2 from './imgs/Jacket_2.png'
import jacket_3 from './imgs/Jacket_3.jpg'
import jacket_4 from './imgs/Jacket_4.jpg'

export const Home = () => {
  return (
    <>
    <header className='header_container'>
      <nav className='menu'>
        <div className="dropdown open">
          <a className="btn_toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <IoMenu />
          </a>
          <div className="cont_items dropdown-menu" aria-labelledby='triggerId'>
            <a className="nav-link" href="/admnin_register">Registro Usuario</a>
            <a className="nav-link" href="/table_employees">Empleados</a>
          </div>
        </div>
      </nav>
    </header>
    <div className="wrapper">
      <div className="one">
        <img className='img_jacket' src={jacket_1} alt="Jacket_1"/>
      </div>
      <div className="two">
      <img className='img_jacket' src={jacket_2} alt="Jacket_2"/>
      </div>
      <div className="three">
      <img className='img_jacket' src={jacket_3} alt="Jacket_3"/>
      </div>
      <div className="four">
      <img className='img_jacket' src={jacket_4} alt="Jacket_4"/>
      </div>
    </div>
    </>
  )
}
