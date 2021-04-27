const express = require('express');

const app = express();

app.get('/', (req, res) => { // http GET 멸령
    res.send('hello world'); //응답이 200일 경우 body에 들어감
})

app.listen(3085, ()=>{ 
    console.log(`welcome to backend port number ${3085}`);
})