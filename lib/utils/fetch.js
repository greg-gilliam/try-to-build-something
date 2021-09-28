const fetch = require('node-fetch');

const url = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';

const fetchInsult = async () => {
  const http = await fetch(url);
  const { insult } = await http.json();
  return insult;
};

module.exports = fetchInsult;
