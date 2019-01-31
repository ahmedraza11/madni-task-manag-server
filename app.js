const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const employeeRoute = require('./api/routes/employee');
const projectRoute = require('./api/routes/project');
const taskRoute = require('./api/routes/task');
const authRoute = require('./api/routes/auth');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/employee', employeeRoute);
app.use('/project', projectRoute);
app.use('/task', taskRoute);
app.use('/auth', authRoute);


module.exports = app;