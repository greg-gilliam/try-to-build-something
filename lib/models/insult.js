const pool = require('./utils/pool');

module.exports = class Insult {
    id;
    insult;

    constructor(row) {
        this.id = row.id;
        this.insult = row.insult;
    }

    static async insert({ insult }) {
        const { rows } = await pool.query(
            'INSERT INTO insults (insult)', [insult]
        );
        return new Insult(rows[0]);
    }
} 
