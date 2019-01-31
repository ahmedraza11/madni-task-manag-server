const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanagementsystem'
});



router.get('/', function (req, res, next) {
    connection
        .query(`
        select 
            task.id,
            task.task,
            task.subjectOfEmail,
            b.name as assignTo,
            task.targetedDate,
            a.name as assignedBy,
            c.dept_name as departmentName,
            project.projectName,
            task.fileSource,
            task.priority,
            task.status,
            task.startDate,
            task.endDate,
            task.comment,
            task.pageQuantity,
            task.fileQuantity
        from
            task
        INNER JOIN
            employee a on task.assignedBy = a.id
        INNER JOIN
            employee b on task.assignTo = b.id
        INNER JOIN
            department c on b.department_id = c.id
        INNER JOIN
            project on task.projectId = project.id`,
            (err, result) => {
                if (err) res.status(500).json({ message: err });
                res.status(200).json(result);
            });
}); 


// Get CurrentUser Tasks
router.get('/:userId', function (req, res, next) {
    const userId = req.params.userId;
    connection.query(
        `SELECT * FROM task WHERE assignTo="$${userId}"`
        , (err, result) => {
            if (err) res.status(500).json({ message: err });
            res.status(200).json(result);
        });
})



// Get specific Task
router.get('/getTask/:taskId', function (req, res, next) {
    const taskId = req.params.taskId;
    connection.query(
        `SELECT * FROM task WHERE id=${taskId}`
        , (err, result) => {
            if (err) res.status(500).json({ message: err });
            res.status(200).json(result);
        });
})


// Post a Task
// router.post('/', function (req, res) {
//     connection.connect();
//     connection.query('INSERT INTO task (task, subjectOfEmail, assignTo, workType, assignDate, targetedDate, priority, assignedBy, projectId,fileSource, status, startDate, endDate, comment,pageQuantity, fileQuantity, createdAt) values ("' + req.body.task + '", "' + req.body.emailSub + '","' + req.body.assginTo + '",' + req.body.workType + ',"' + req.body.assignDate + '","' + req.body.targetedDate + '",' + req.body.priority + ',"' + req.body.assignedBy + '",' + req.body.projectId + ',"' + req.body.fileSource + '","' + req.body.status + '","' + req.body.startDate + '","' + req.body.endDate + '","' + req.body.comment + '","' + req.body.pageQuantity + '","' + req.body.fileQuantity + '","' + new Date().toISOString() + '")',
//         (err, result) => {
//             if (err) res.status(500).json({
//                 message: "unfortunatly task NOT Created",
//                 taskCreated: false,
//                 error: err
//             });
//             res.status(200).json({
//                 message: "Task Successfully Created",
//                 taskCreated: true,
//                 result: result
//             });
//         });
//     connection.end();
// });


router.post('/', function (req, res) {
    connection.query(`
    INSERT INTO task 
        (task, subjectOfEmail, assignTo, workType, assignDate, targetedDate, priority, assignedBy, projectId,fileSource, status, startDate, endDate, comment,pageQuantity, fileQuantity, createdAt)
    values 
    (
        "${req.body.task}",
        "${req.body.emailSub}",
        "${req.body.assginTo}",
        ${req.body.workType},
        "${req.body.assignDate}",
        "${req.body.targetedDate}",
        ${req.body.priority},
        "${req.body.assignedBy}",
        ${req.body.projectId},
        "${req.body.fileSource}",
        "${req.body.status}",
        "${req.body.startDate}",
        "${req.body.endDate}",
        "${req.body.comment}",
        "${req.body.pageQuantity}",
        "${req.body.fileQuantity}",
        "${new Date().toISOString()}"
    )`,
        (err, result) => {
            if (err) res.status(500).json({
                message: "unfortunatly task NOT Created",
                taskCreated: false,
                error: err
            });
            res.status(200).json({
                message: "Task Successfully Created",
                taskCreated: true,
                result: result
            });
        });
});



router.post('/update/:id', function (req, res) {
    connection.query(
        `UPDATE task 
            SET 
                task="${req.body.task}",
                subjectOfEmail="${req.body.emailSub}",
                assignTo="${req.body.assginTo}", 
                workType='${req.body.workType}', 
                assignDate="${req.body.assignDate}", 
                targetedDate="${req.body.targetedDate}", 
                priority='${req.body.priority}', 
                assignedBy="${req.body.assignedBy}", 
                projectId='${req.body.projectId}', 
                fileSource="${req.body.fileSource}", 
                status="${req.body.status}", 
                startDate="${req.body.startDate}", 
                endDate="${req.body.endDate}", 
                comment="${req.body.comment}", 
                pageQuantity='${req.body.pageQuantity}', 
                fileQuantity='${req.body.fileQuantity}' 
        WHERE id='${req.params.id}'`,
        (err, result) => {
            if (err) res.status(500).json({
                message: "unfortunatly task NOT updated",
                taskUpdated: false,
                error: err
            });
            res.status(200).json({
                message: "Task Successfully Updated",
                taskUpdated: true,
                result: result
            });
        });
});



// Update a Task Status
router.post('/updateTaskStatus/:id', function (req, res) {
    connection.query(`
        UPDATE task
            SET 
        status="${req.body.status}"
        WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(404).json({
                message: "some error accurd",
                taskStatusUpdated: false,
                error: err
            });
            if (result.affectedRows <= 0) {
                res.status(500).json({
                    message: "unfortunatly task Status NOT updated",
                    taskStatusUpdated: false,
                    error: err
                })
            }
            else {
                res.status(200).json({
                    message: "Task Status Successfully Updated",
                    taskStatusUpdated: true,
                    result: result
                });
            }
        });
});

module.exports = router;