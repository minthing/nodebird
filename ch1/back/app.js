const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(3085, ()=>{
    console.log(`welcome to backend port number ${3085}`);
})