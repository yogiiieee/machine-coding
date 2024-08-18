const express = require("express");
const app = express();

app.use(express.json());

const db = require('./models')
const Apikeys = db.apikeys;

db.mongoose.connect(
    db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the Database!");
    }).catch(err => {
        console.log("Error!");
        process.exit(1);
    });
    
app.get('/', (req, res) => {
    res.json({msg: 'API KEY MANAGER'});
});
    
require('./routes/keys.routes')(app);

const deleteExpiredKeys = async() => {
    const fiveMins = new Date(Date.now() - 5 * 60 * 1000);
    await Apikeys.deleteMany({
        lastUsedAt: {$lt: fiveMins}
    });
};

const releasedBlockedKeys = async() => {
    const oneMin = new Date(Date.now() - 60 * 1000);
    await Apikeys.updateMany(
        {isBlocked: true, blockedAt: {$lt: oneMin}},
        {$set: {isBlocked: false, blockedAt: null}}
    );
};

setInterval(deleteExpiredKeys, 60 * 1000);
setInterval(releasedBlockedKeys, 60 * 1000);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});