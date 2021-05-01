const express = require('express');
const db = require('./models');
const app = express();

db.sequelize.sync();

app.use(express.json()); // 미들웨어
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => { // http GET 멸령
    res.send('hello world!!!'); //응답이 200일 경우 body에 들어감
})

app.post('/user', async (req, res, next)=>{
try{
    const newUser = await db.User.create({
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname
    })
    res.status(200).json(newUser); // json으로 응답함
} catch(err){
    console.log(err);
    next(err);
}

})

app.listen(3085, ()=>{ 
    console.log(`welcome to backend port number ${3085}`);
})