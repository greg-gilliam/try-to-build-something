const pool = require('../utils/pool');

module.exports = class Insult {
  id;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.quotes = row.quotes;
  }

  static async insert({ quotes }) {
    const { rows } = await pool.query(
      'INSERT INTO insult (quotes) VALUES ($1) RETURNING *',
      [quotes]
    );
    return new Insult(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM insult');
    return rows.map((row) => {
      return new Insult(row);
    });
  }

  static async getInsult(id) {
    const { rows } = await pool.query('SELECT * FROM insult WHERE id = ($1)', [
      id,
    ]);
    return new Insult(rows[0]);
  }

  static async patchInsult(id, quotes) {
    const { rows } = await pool.query(
      `UPDATE insult
            SET quotes = $2
            WHERE id = $1
            RETURNING *`,
      [id, quotes]
    );
    return new Insult(rows[0]);
  }

  static async deleteUserInsult(id) {
    const { rows } = await pool.query(
      `DELETE FROM insult
            WHERE id = $1
            RETURNING *`,
      [id]
    );
    return new Insult(rows[0]);
  }
};
