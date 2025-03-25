const express = require('express');
const mongoose = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Cloud Native App is Running!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
