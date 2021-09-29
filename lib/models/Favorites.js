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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM favorites');
    return rows.map((row) => {
      return new Favorites(row);
    });
  }

  static async getFavorite(id) {
    const { rows } = await pool.query(
      'SELECT * FROM favorites WHERE id = ($1)',
      [id]
    );
    return new Favorites(rows[0]);
  }

  static async patchFavorite(id, quotes) {
    const { rows } = await pool.query(
      `UPDATE favorites
          SET quotes = $2
          WHERE id = $1
          RETURNING *`,
      [id, quotes]
    );
    return new Favorites(rows[0]);
  }

  static async deleteUserFavorite(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM favorites
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Favorites(rows[0]);
  }
};
