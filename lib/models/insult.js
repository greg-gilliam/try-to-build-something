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
            'INSERT INTO insult (quotes) VALUES ($1) RETURNING *', [quotes], 
        );
        return new Insult(rows[0]);
    }
} 
