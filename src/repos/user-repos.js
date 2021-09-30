const pg = require('pg');
const pool = require('../pool');

class UserRepo {
  static async find() {
    const { rows } = await pool.query(`SELECT * FROM users`);
    return rows;
  }
}
module.exports = UserRepo 