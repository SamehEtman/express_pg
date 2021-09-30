const pool = require('../pool')
const {randomBytes} = require('crypto')
const {default:migrate} = require('node-pg-migrate')
const format = require('pg-format')

const default_opt = {
    host : 'localhost',
    port : 5432 ,
    database: 'socialnetwork-test',
    user:'postgres',
    password : 's159951s'
}

class Context {
    static async build(){
        const roleName = 'a' + randomBytes(4).toString();
        // connect to the dp 
        await pool.connect(default_opt)
        // create new role 
        await pool.query(format('create role %I with login password %L' , roleName , roleName))
        // set the shema and make it the default 
        await pool.query(format ('create schema %I authorization %I' , roleName , roleName))
        // disconnect from the dp 
        await pool.close()
        // migrate the data base 
        await migrate ({
            schema : roleName , 
            direction : 'up',
            log:()=>{},
            noLock :true,
            dir :'migrations',
            databaseUrl :{
                host : 'localhost',
                port : 5432 ,
                database: 'socialnetwork-test',
                user:roleName,
                password : roleName 
            }
        })
        // connect with the new role 
        await pool.connect ({
            host : 'localhost',
            port : 5432 ,
            database: 'socialnetwork-test',
            user:roleName,
            password : roleName 
        })
        return new Context(roleName);
    }
    constructor (roleName){
        this.roleName = roleName;
    }

    async reset(){
        return pool.query(`delete from users`)
    }

    async close(){
        // close connection 
        await pool.close()
        // open default connection 
        await pool.connect(default_opt)
        // remove role its schema 
        await pool.query(format(`drop schema %I CASCADE` , this.roleName))
        await pool.query(format('drop role %I' , this.roleName))
        // close default connection
        await pool.close()
    }
}

module.exports = Context