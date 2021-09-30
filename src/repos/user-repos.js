const pg = require('pg');
const pool = require('../pool');

class UserRepo {
  static async find() {
    const { rows } = await pool.query(`SELECT * FROM users`);
    return rows;
  }
  static async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    return rows[0];
  }
}
module.exports = UserRepo;
