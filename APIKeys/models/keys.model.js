const mongoose = require('mongoose');

const apikeysSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    isBlocked: {type: Boolean, default: false},
    blockedAt: Date,
    lastUsedAt: Date
});

const Apikeys = mongoose.model('Keys', apikeysSchema);

module.exports = Apikeys;