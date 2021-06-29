require('module-alias/register');
const express = require('express');
const config = require("config");
const app = express();
const port = config.get('port');
const db = require('@util/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routeUser = require("@route/user");
const routeAuthen =  require("@route/authen");
const routeTask =  require("@route/task");
    // origin: "http://localhost:4200/"
// app.use(cors());
app.use(cors({
    origin: [
        "http://localhost:3333",
        "http://localhost:4200"
    ],
    credentials: true,
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//     // res.send({"name": "ngoc", "age": 21})
//     return res.cookie('token', 'token-ABCCBSDFs', {
//         expires: new Date(Date.now() + 10000),
//         secure: false, // set to true if your using https
//         httpOnly: true,
//     }).send("ok");
// })

// app.post("/", (req, res) => {
//     const token = req.cookies.token || '';
//     try {
//       if (!token) {
//         return res.status(401).send('You need to Login')
//       }
//     //   const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
//     //   req.user = {
//     //     id: decrypt.id,
//     //     firstname: decrypt.firstname,
//     //   };
//       res.status(200).send('You need to Login')
//     } catch (err) {
//       return res.status(500).json(err.toString());
//     }
// })

app.use('/api/user', routeUser);
app.use('/api/login', routeAuthen);
app.use('/api/task', routeTask);

db.connectDB();

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});

