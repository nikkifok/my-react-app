// api/submit.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { responses } = req.body;

    try {
      const client = await pool.connect();
      await client.query('INSERT INTO responses(data) VALUES($1)', [JSON.stringify(responses)]);
      client.release();
      res.status(200).send('Responses saved successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};