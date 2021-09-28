const pool = require('../utils/pool');

module.exports = class Favorites {
  id;
  username;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.quotes = row.quotes;
  }

  static async insert({ username, quotes }) {
    const { rows } = await pool.query(
      'INSERT INTO favorites (username, quotes) VALUES ($1, $2) RETURNING *',
      [username, quotes]
    );
    return new Favorites(rows[0]);
  }
};
