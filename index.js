const express = require('express');
const config = require("config");
const app = express();
const port = config.get('port');

const db = require("./utils/db");
const routeUser = require("./routes/user");
const routeAdmin =  require("./routes/admin");

db.connectDB();

//app.use(morgan("combined"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user', routeUser);
app.use('/admin', routeAdmin);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});