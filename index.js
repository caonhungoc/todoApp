const express = require('express');
const config = require("config");
const app = express();
const port = config.get('port');

// const db = require("./utils/db");
// const routeUser = require("./routes/user");
// const routeAdmin =  require("./routes/admin");

// db.connectDB();

// //app.use(morgan("combined"));
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// app.use('/user', routeUser);
// app.use('/admin', routeAdmin);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
// const config = require("config");

const sqlDbUrl = config.get('sqlDbUrl');
const sqlDbName = config.get('sqlDbName');
const sqlDbUserName = config.get('sqlDbUserName');
const sqlDbPassword = config.get('sqlDbPassword');
const sqlDbPort = config.get('sqlDbPort');
const Sequelize = require('sequelize');

// option examples
const sequelize = new Sequelize(sqlDbName, sqlDbUserName, sqlDbPassword, {
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    dialect: 'mysql',
  
    // custom host; default: localhost
    host: sqlDbUrl,
    // for postgres, you can also specify an absolute path to a directory
    // containing a UNIX socket to connect over
    // host: '/sockets/psql_sockets'.
  
    // custom port; default: dialect default
    port: sqlDbPort
  })

  const role = sequelize.define('ROLEs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: Sequelize.STRING },
      {
      timestamps: false,

      // If don't want createdAt
      createdAt: false,
    
      // If don't want updatedAt
      updatedAt: false
  })

    sequelize.authenticate()
    .then(() => {
        console.log("database connected ...");
        // role.findAll()
        // .then((roles) => console.log(roles))
        // .catch(e => console.log("error " + e));
        let name ="unknown";
        role.create({
            name
        }).then(role => {
            console.log(role)
        }).catch(e => console.log("error "+ e))
    })
  .catch(err => console.log("error1 " + err))