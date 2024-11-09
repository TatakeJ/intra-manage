const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'intramanagewebdb'
})

//empleados
app.post('/login', (req, res) => {
    const { user_name, password } = req.body;

    db.query('SELECT * FROM employees WHERE user_name=? AND password=?', [user_name, password], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send({
                "id": result[0].id,
                "user_name": result[0].user_name,
                "email": result[0].email,
            });
        }
    })
})

app.post('/create', (req, res) => {
    const { user_name, email, password, state } = req.body;

    db.query('INSERT INTO employees(user_name, email, password, state) VALUES(?,?,?,?)', [user_name, email, password, state], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })  
})

app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('SELECT * FROM employees WHERE id=?', [id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })  
})

app.put('/update', (req, res) => {
    const { id, user_name, email } = req.body;

    db.query('UPDATE employees SET user_name=?, email=? WHERE id=?', [user_name, email, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

//cambiar estado empleado
app.put('/update_state_InA', (req, res) => {
    const { id, state } = req.body;

    db.query('UPDATE employees SET state=? WHERE id=?', [state, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.put('/update_state_A', (req, res) => {
    const { id, state } = req.body;

    db.query('UPDATE employees SET state=? WHERE id=?', [state, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

//Bills
app.post('/crte_bill', (req, res) => {
    const { user_name, reference, amount, full_payment, emplo_id } = req.body;

    db.query('INSERT INTO bills_employees(user_name, reference, amount, full_payment, emplo_id) VALUES(?,?,?,?,?)', [user_name, reference, amount, full_payment, emplo_id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.get('/bills', (req, res) => {
    db.query('SELECT * FROM bills_employees', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })  
})

app.listen(3001, () => {
    console.log('listening');
})