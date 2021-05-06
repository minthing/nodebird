
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cookie = require('cookie-parser');

const db = require('./models');
const passportConfig = require('./passport');

//db.sequelize.sync({force:true});
db.sequelize.sync();
passportConfig();
const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie('cookiesecret'));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'cookiesecret',
    cookie : {
        httpOnly : true,
        sercure : false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=> {
    res.send('안녕 백엔드');
});

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

app.post('/user/login', (req, res, next) => {
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
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
}) 