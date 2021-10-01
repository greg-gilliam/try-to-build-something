const pool = require('../utils/pool');

module.exports = class Pets {
  id;
  petname;
  nickname;

  constructor(row) {
    this.id = row.id;
    this.petname = row.petname;
    this.nickname = row.nickname;
  }

  static async insert({ petname, nickname }) {
    const { rows } = await pool.query(
      'INSERT INTO pets (petname, nickname) VALUES ($1, $2) RETURNING *',
      [petname, nickname]
    );
    return new Pets(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM pets');
    return rows.map((row) => {
      return new Pets(row);
    });
  }
};
