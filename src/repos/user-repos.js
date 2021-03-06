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
  static async insert({ username, bio }) {
    const { rows } = await pool.query(
      `insert into users (username , bio)
    values ($1 , $2) returning *`,
      [username, bio]
    );
    return rows[0];
  }
  static async update({ id, bio, username }) {
    const { rows } = await pool.query(
      `
        update users
        set bio = $1 , username = $2
        where id = $3
        returning *
      `,
      [bio, username, id]
    );
    return rows[0];
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `delete from users where id = $1 returning *`,
      [id]
    );
    return rows[0];
  }
}
module.exports = UserRepo;
