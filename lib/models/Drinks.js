const pool = require('../utils/pool');

module.exports = class Drinks {
  id;
  drinkname;
  drinktime;

  constructor(row) {
    this.id = row.id;
    this.drinkname = row.drinkname;
    this.drinktime = row.drinktime;
  }

  static async insert({ drinkname, drinktime }) {
    const { rows } = await pool.query(
      'INSERT INTO drinks (drinkname, drinktime) VALUES ($1, $2) RETURNING *',
      [drinkname, drinktime]
    );
    return new Drinks(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM drinks');
    return rows.map((row) => {
      return new Drinks(row);
    });
  }

  static async getDrink(id) {
    const { rows } = await pool.query('SELECT * FROM drinks WHERE id = ($1)', [
      id,
    ]);
    return new Drinks(rows[0]);
  }

  static async patchDrink(id, drinkname) {
    const { rows } = await pool.query(
      `
    UPDATE drinks 
    SET drinkname = $2
    WHERE id = $1
    RETURNING *`,
      [id, drinkname]
    );
    return new Drinks(rows[0]);
  }

  static async deleteDrink(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM drinks 
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Drinks(rows[0]);
  }
};
