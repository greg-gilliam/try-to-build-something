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
};
