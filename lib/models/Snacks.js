const pool = require('../utils/pool');

module.exports = class Snacks {
  id;
  snackname;
  snacktime;

  constructor(row) {
    this.id = row.id;
    this.snackname = row.snackname;
    this.snacktime = row.snacktime;
  }

  static async insert({ snackname, snacktime }) {
    const { rows } = await pool.query(
      'INSERT INTO snacks (snackname, snacktime) VALUES ($1, $2) RETURNING *',
      [snackname, snacktime]
    );
    return new Snacks(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM snacks');
    return rows.map((row) => {
      return new Snacks(row);
    });
  }

  static async getSnack(id) {
    const { rows } = await pool.query('SELECT * FROM snacks WHERE id = ($1)', [
      id,
    ]);
    return new Snacks(rows[0]);
  }

  static async patchSnack(id, snackname) {
    const { rows } = await pool.query(
      `
      UPDATE snacks
      SET snackname = $2
      WHERE id = $1
      RETURNING *`,
      [id, snackname]
    );
    return new Snacks(rows[0]);
  }

  static async deleteSnack(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM snacks
          WHERE id = $1
          RETURNING *`,
      [id]
    );
    return new Snacks(rows[0]);
  }
};
