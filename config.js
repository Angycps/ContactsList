const PAGE_URL = process.env.NODE_ENV === 'production'
? 'Placeholder'
: 'http://localhost:3007';

const MONGO_URI = process.env.NODE_ENV === 'production'
? process.env.MONGO_URI_PROD
: process.env.MONGO_URI_TEST

module.exports = { PAGE_URL, MONGO_URI };
