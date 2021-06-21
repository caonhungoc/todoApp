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
    // origin: "http://localhost:4200/"
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:4200/"
// }));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send({"name": "ngoc", "age": 21})
// })

// app.post("/", (req, res) => {
//     const data = req.body;
//     res.send({"name": "ngoc", "age": 21})
// })

app.use('/api/user', routeUser);
app.use('/api/login', routeAuthen);
app.use('/api/task', routeTask);

db.connectDB();

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});

