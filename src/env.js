const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MODE: process.env.MODE,
  SERVER_URI: process.env.SERVER_URI || 'ws://localhost:8080',
  DEVICE: process.env.DEVICE || 'pi-sense-hat-library-sample'
};