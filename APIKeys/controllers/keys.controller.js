const db = require('../models');
const Apikeys = db.apikeys;

exports.generate = async (req, res) => {
    try {
        const key = {
            createdAt: new Date(),
            isBlocked: false,
            blockedAt: null,
            lastUsedAt: new Date()
        };
        const result = await Apikeys.create(key);
        res.status(201).json({keyId: result._id, createdAt: result.createdAt});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.findKey = async (req, res) => {
    try {
        const key = await Apikeys.findOneAndUpdate(
            {isBlocked: false},
            {
                $set: {isBlocked: true, blockedAt: Date.now()}
            },
            {sort: {createdAt: 1}, new: true}
        );
        if(!key) return res.status(404).json({});
        res.status(200).json({keyId: key._id});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.getKey = async (req, res) => {
    try {
        const key = await Apikeys.findById(req.params.id);
        if(!key) return res.status(404).json({});
        res.status(200).json({
            isBlocked: key.isBlocked,
            blockedAt: key.blockedAt
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.removeKey = async (req, res) => {
    try {
        const result = await Apikeys.findByIdAndDelete(req.params.id);
        if(!result) return res.status(404).json({});
        res.status(200).json({msg: "Key deleted!"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.unBlockKey = async (req, res) => {
    try {
        const result = await Apikeys.findByIdAndUpdate(
            req.params.id,
            {$set: {isBlocked: false, blockedAt: null}},
            {new: true}
        );
        if(!result) return res.status(404).json({});
        res.status(200).json({msg: "Updated!"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.keepAliveKey = async (req, res) => {
    try {
        const result = await Apikeys.findByIdAndUpdate(
            req.params.id,
            {$set: {lastUsedAt: new Date()}},
            {new: true}
        );
        if(!result) return res.status(404).json({});
        res.status(200).json({msg: "Kept Alive!"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};