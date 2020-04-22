const {Pool} = require('pg');

module.exports = new Pool({
    user:"postgres",
    password:"@mdk3t50",
    host:"localhost",
    port:5432,
    database:"schoolmanager"
})
 