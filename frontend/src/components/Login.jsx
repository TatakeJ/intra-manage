import React from 'react'
import {useState} from 'react'
import Axios from 'axios' 

export const Login = () => {

    const [body, setBody] = useState({user_name: '', password: ''});

    const inputChange = ({ target }) => {
        const { name, value } = target;
        setBody({ 
            ...body,
            [name]: value
        });
    }

    const onSubmit = () => {
        Axios.post('http://localhost:3001/login', body)
        .then(({ data }) => {
            console.log(data);
        }).catch(({ reponse }) => {
            console.log(reponse.data);
        });
    };


    return (
    <div className='container'>
        <form>
            <div className="mb-3">
                <label className="form-label">User Name</label>
                <input value={body.user_name} onChange={inputChange} name='user_name' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input value={body.password} onChange={inputChange} name='password' type="password" className="form-control" id="exampleInputPassword1" required/>
            </div>
        </form>
        <button onClick={onSubmit} className="btn btn-primary">Submit</button>
    </div>
    )
}
