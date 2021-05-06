const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const bcrypt = require('bcrypt');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

db.sequelize.sync({force:true}); //force:true -> 실전에서는 마이그레이션
passportConfig();

app.use(morgan('dev')); // 요청이 왔을 때 콘솔에 요청을 기록해줌
app.use(cors('http://localhost:3000'));
app.use(express.json()); // 미들웨어
app.use(express.urlencoded({extended:false}));
app.use(cookie('cookiesecret'));
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

app.post('/user', async (req, res, next) => {
    try{
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
            where:{
                email:req.body.email,
            }
        });

        if(exUser) { //이미 회원가입 되어있으면
            return res.status(403).json({
                errorCode: 1,
                message: '이미 회원가입 되어있습니다.'
            })
        };
        
        const newUser = await db.User.create({
            //where:{
                nickname:req.body.nickname,
                password:hash,
                email:req.body.email,
           // }
        });

        passport.authenticate('local', (err, user, info) => {
            if(err) {
                console.error(err);
                return next(err);
            }
    
            if(info){
                return res.status(401).send(info.reason);
            }
    
            return req.login(user, (err) => {
                if(err){
                    console.error(err);
                    return next(err);
                }
    
                return res.json(user);
            });
    
        })(req, res, next);

    } catch (err) {
        console.log(err);
        next(err);
    }
   
});

const user = {

}

app.post('/user/login', (req, res) => {
    password.authenticate('local', (error, user, info)=>{ // 로그인 할 때 localStratey 실행 => done 콜백 함수의 인수가 3개 에러, 성공, 실패의 결과를 다음 인수로 받음
        if(error){
            console.error(error);
            return next(error); //에러 넘겨버리기
        }
        if(info){
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (error) => {
            if(error){
                console.error(error);
                return next(error)
            }
            return res.json(user);
        }) // passport.initialize에서 만들어줌 -> session에 사용자 정보 저장해줌 how :serializeUser
    })(req, res, next);
    // req.body.email,
    // req.body.password,
    // await db.User.findOne(); // 이메일과 패스워드 검사
    // user[cookie] = '' //userInfo : 쿠키를 키로 받아서 유저 정보 저장하기
})
app.listen(3085, ()=>{ 
    console.log(`welcome to backend port number ${3085}`);
})