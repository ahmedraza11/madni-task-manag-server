const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanagementsystem'
});

//Get All Employees
router.post('/login', function (req, res) {
    connection.query('SELECT * FROM employee where username="' + req.body.username + '" AND password="' + req.body.password + '" ', function (error, results, fields) {
        if (error) throw error;
        if (results) {
            if (results.length <= 0) {
                res.status(500).json(
                    {
                        message: "invalid username or password",
                        loggedIn: false,
                    }
                );
            } else {
                res.status(200).json(
                    {
                        message: "user successfull logged in",
                        loggedIn: true,
                        result: results
                    }
                )
            }
        }

    });
});


router.put('/authUpdate', function (req, res) {
    connection.query('update employee set username="' + req.body.newUsername + '",  password= "' + req.body.newPassword + '" where id="' + req.body.id + '"', function (error, results, fields) {
        if (error) throw error;
        res.status(201).json(
            {
                message: "User successfully updated!",
                updated: true,
                result: results
            }
        )
    });
});

module.exports = router;