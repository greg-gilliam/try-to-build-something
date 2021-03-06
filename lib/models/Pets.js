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

  static async getPet(id) {
    const { rows } = await pool.query('SELECT * FROM pets WHERE id = ($1)', [
      id,
    ]);
    return new Pets(rows[0]);
  }

  static async patchPet(id, petname) {
    const { rows } = await pool.query(
      `
    UPDATE pets 
    SET petname = $2
    WHERE id = $1
    RETURNING *`,
      [id, petname]
    );
    return new Pets(rows[0]);
  }

  static async deletePet(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM pets 
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Pets(rows[0]);
  }
};
