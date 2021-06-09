const config = require("config");
const Sequelize = require('sequelize');

const sqlDbUrl = config.get('sqlDbUrl');
const sqlDbName = config.get('sqlDbName');
const sqlDbUserName = config.get('sqlDbUserName');
const sqlDbPassword = config.get('sqlDbPassword');
const sqlDbPort = config.get('sqlDbPort');


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

function connectDB() {
    sequelize.authenticate()
    .then(() => {
        console.log("database connected ...");
    })
    .catch(err => console.log("error1 " + err))
}

module.exports.sequelize = sequelize;
module.exports.connectDB = connectDB;

