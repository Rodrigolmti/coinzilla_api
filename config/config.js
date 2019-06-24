require('dotenv').config();

module.exports = {
	'secret': process.env.APP_SECRET,
	'database': process.env.DATABASE_URL,
	'apiKey' : process.env.MARKETCAP_KEY
};
