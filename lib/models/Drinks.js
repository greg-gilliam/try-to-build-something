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
};
