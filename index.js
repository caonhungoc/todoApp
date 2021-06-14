require('module-alias/register');
const express = require('express');
const config = require("config");
const app = express();
const port = config.get('port');
const db = require('@util/db');
const cors = require('cors');

const routeUser = require("@route/user");
const routeAuthen =  require("@route/authen");
const routeTask =  require("@route/task");

app.use(cors({
    origin: "http://localhost:3333"
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/user', routeUser);
app.use('/api/login', routeAuthen);
app.use('/api/task', routeTask);

db.connectDB();

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});

