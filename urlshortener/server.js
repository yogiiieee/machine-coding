const express = require('express');

const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});

const app = express();
// to parse body
app.use(express.json());

require('./routes/urls.routes')(app);

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});