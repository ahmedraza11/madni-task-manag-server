const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const uuid = require('uuid/v4')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanagementsystem'
});

//Get All Employees 
router.get('/', function (req, res) {
    connection.query('SELECT * FROM employee ', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
});

// Create New Employee
router.post('/', function (req, res) {
    connection.query('INSERT INTO employee (id, name, designation, phone, department_id, username, password, createdAt) values ("' + uuid() + '","' + req.body.name + '","' + req.body.designation + '","' + req.body.phoneNumber + '",6,"' + req.body.username + '","' + req.body.password + '","' + new Date().toISOString() + '")', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
        connection.end();
    });
});

module.exports = router;