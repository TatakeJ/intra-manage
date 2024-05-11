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

app.post('/create', (req, res) => {
    const user_name = req.body.user_name;
    const email = req.body.email;

    db.query('INSERT INTO employees(user_name, email) VALUES(?,?)', [user_name, email], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.get('/employees', (req, res) => {
    // const user_name = req.body.user_name;
    // const email = req.body.email;

    db.query('SELECT * FROM employees', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id;
    const user_name = req.body.user_name;
    const email = req.body.email;

    db.query('UPDATE employees SET user_name=?, email=? WHERE id=?', [user_name, email, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM employees WHERE id=?', id, (err, result) => {
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