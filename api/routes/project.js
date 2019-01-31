const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanagementsystem'
});

// Get ALl Projects
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM project', (err, result) => {
        if (err) res.status(500).json({ message: "project table nahi hai", error: err });
        res.status(200).json(result);
    });
})

// Create a New Project
router.post('/', function (req, res) {
    connection.query('INSERT INTO project (projectName, ownerId, startDate, endDate, assignDate, targetedDate, fileSource, assginedBy, fileQuantity, pageQuantity, createdAt, status, comment) values ("' + req.body.projectName + '", "' + req.body.ownerId + '","' + req.body.startDate + '","' + req.body.endDate + '","' + req.body.assignDate + '","' + req.body.targetedDate + '","' + req.body.fileSource + '","' + req.body.assignedBy + '","' + req.body.fileQuantity + '","' + req.body.pageQuantity + '","' + new Date().toISOString() + '","' + req.body.status + '","' + req.body.comment + '")', (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json(result);
    });
});

// update Project
router.post('/update/:id', function (req, res) {
    connection.query('update project set projectName="' + req.body.projectName + '",ownerId="' + req.body.ownerId + '",startDate="' + req.body.startDate + '",endDate="' + req.body.endDate + '",assignDate="' + req.body.assignDate + '",targetedDate="' + req.body.targetedDate + '",fileSource="' + req.body.fileSource + '",assginedBy="' + req.body.assignedBy + '",fileQuantity="' + req.body.fileQuantity + '",pageQuantity="' + req.body.pageQuantity + '",status="' + req.body.status + '",comment="' + req.body.comment + '" where id= ' + req.params.id + '', (err, result) => {
        if (err) res.status(500).json({ message: "some errors in update project", error: err });
        res.status(200).json({ message: "update successully done", result: result });
    });
});



module.exports = router;