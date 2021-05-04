const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const bcrypt = require('bcrypt');

db.sequelize.sync({force:true}); //force:true -> 실전에서는 마이그레이션

app.use(cors('http://localhost:3000'));
app.use(express.json()); // 미들웨어
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => { // http GET 멸령
    res.send('hello world!!!'); //응답이 200일 경우 body에 들어감
})

app.post('/user', async (req, res, next)=>{
try{
    const hash = await bcrypt.hash(req.body.password, 12);
    const existUser = db.User.findOne({
        email: await req.body.email,
    })
    if(existUser){
        return res.status(403).json({
            errorCode:403,
            message: '이미 회원가입이 되어 있으십니당'
        });
    }
    const newUser = await db.User.create({
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname
    })
    return res.status(201).json(newUser); // json으로 응답함
} catch(err){
    console.log(err);
    next(err);
}

})

app.listen(3085, ()=>{ 
    console.log(`welcome to backend port number ${3085}`);
})