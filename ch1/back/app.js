const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => { // http GET 멸령
    res.send('the world'); //응답이 200일 경우 body에 들어감
})

app.post('/user', (req, res)=>{
    req.body.email;
    req.body.password;
    req.body.nickname;
})

app.listen(3085, ()=>{ 
    console.log(`welcome to backend port number ${3085}`);
})