const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const bcrypt = require('bcrypt');
const user = require('./models/user');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');

db.sequelize.sync({force:true}); //force:true -> 실전에서는 마이그레이션
passportConfig();

app.use(morgan('dev')); // 요청이 왔을 때 콘솔에 요청을 기록해줌
app.use(cors('http://localhost:3000'));
app.use(express.json()); // 미들웨어
app.use(express.urlencoded({extended:false}));
app.use(cookie());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'cookiesecret'
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.post('/user/login', (req, res) => {
    req.body.email,
    req.body.password,
    await db.User.findOne(); // 이메일과 패스워드 검사
    user[cookie] = '' //userInfo : 쿠키를 키로 받아서 유저 정보 저장하기
})

app.listen(3085, ()=>{ 
    console.log(`welcome to backend port number ${3085}`);
})