require('module-alias/register');
const express = require('express');
const config = require("config");
const app = express();
const port = config.get('port');
const db = require('@util/db');

const routeUser = require("@route/user");
const routeAdmin =  require("@route/admin");
const routeTask =  require("@route/task");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user', routeUser);
app.use('/admin', routeAdmin);
app.use('/task', routeTask);

db.connectDB();

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});

