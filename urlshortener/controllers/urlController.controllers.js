const {v4: uuidv4} = require('uuid');
const express = require('express')
const PORT = process.env.PORT || 8085;
const hashMap = new Map();

const generateAlias = () => {
    return uuidv4().slice(0, 7);
};

const deleteOldURL = () => {
    const currTime = Date.now();
    for(const [alias, data] of hashMap.entries()) {
        if(data.expiryTime && currTime > data.expiryTime) {
            hashMap.delete(alias);
        }
    }
    // console.log(hashMap);
};

setInterval(deleteOldURL, 10 * 1000);

exports.shortenURL = [express.json(), (req, res) => {
    const {longURL, customAlias, ttlSeconds} = req.body;
    // set alias if it is present else generate
    const alias = customAlias || generateAlias();
    // custom ttl or 2 minutes (120 sec)
    const ttl = ttlSeconds || 120;
    if(hashMap.has(alias)) {
        return res.status(400).json({message: 'Alias is already in use.'});
    }
    const expiryTime = Date.now() + ttl * 1000;
    // also add int accessCounter and accessTimes Array
    hashMap.set(alias, {
        longURL: longURL,
        expiryTime: expiryTime,
        accessCount: 0,
        accessTimes: []
    });
    // console.log(hashMap);
    return res.json({shortURL: `http://localhost:${PORT}/${alias}`})
}];

exports.redirectToURL = (req, res) => {
    const alias = req.params.alias;
    const mapData = hashMap.get(alias);
    // console.log(mapData)
    // if data is not present in map
    if(!mapData) {
        return res.status(404).json({message: 'Alias does not exist or has expired.'});
    } else {
        // increment the access count and the access time as curr time
        mapData.accessCount += 1;
        mapData.accessTimes.push(new Date().toISOString());
        hashMap.set(alias, mapData);
        // res.status(302).redirect(mapData.longURL);
        return res.redirect(302, mapData.longURL);
    }
};

exports.URLAnalytics = (req, res) => {
    const alias = req.params.alias;
    const mapData = hashMap.get(alias);
    // if data is not present in map
    if(!mapData) {
        res.status(404).json({message: 'Alias does not exist or has expired.'});
    }
    return res.status(200).json({
        alias: alias,
        longURL: mapData.longURL,
        accessCount: mapData.accessCount,
        accessTimes: mapData.accessTimes.slice(-10)
    });
};

exports.updateURL = [express.json(), (req, res) => {
    const alias = req.params.alias;
    const {customAlias, ttlSeconds} = req.body;
    const mapData = hashMap.get(alias);
    // if data is not present in map
    if(!mapData) {
        return res.status(404).json({message: 'Alias does not exist or has expired.'});
    }
    if(!customAlias && !ttlSeconds) {
        return res.status(400).json({message: 'Invalid request!'});
    }
    hashMap.delete(alias);
    const newAlias = customAlias || generateAlias();
    const newTtl = ttlSeconds || (mapData.expiryTime - Date.now()) / 1000;
    hashMap.set(newAlias, {
        longURL: mapData.longURL,
        expiryTime: Date.now() + newTtl * 1000,
        accessCount: mapData.accessCount,
        accessTimes: mapData.accessTimes
    });
    return res.status(200).json({message: 'Successfully updated!'});
}];

exports.deleteURL = (req, res) => {
    const alias = req.params.alias;
    if(!hashMap.has(alias)) {
       return res.status(404).json({message: 'Alias does not exist or has expired.'});
    }
    hashMap.delete(alias);
    return res.status(200).json({message: 'Successfully deleted!'});
};