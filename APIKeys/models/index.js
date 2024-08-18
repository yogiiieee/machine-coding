const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = require('../config/db.config').url;
db.apikeys = require('./keys.model');

module.exports = db;