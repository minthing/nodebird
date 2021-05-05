const passport = require('passport');
const bcrypt = require('bcrypt');
const {
    Strategy : LocalStrategy 
} = require('passport-local');
const db = require('./models')
module.exports = () => {
    passport.use(new LocalStorage({

        usernameField:'email',
        passwordField:'password'

    }, async (userId, password, done) => {
        try{
        const existUser = await db.User.findOne({
            where:{ email:email }
        });
        if(!existUser){
            return done(null, false, {reason:'존재하지 않는 사용자'})// 콜백함수 (에러, 성공, 실패)
        }
        const result = await bcrypt.compare(password, existUser.password);
        if(result){
            return done(null, existUser)
        }else{
            return done(null, false, {reason:'비밀번호가 일치하지 않습니다'})
        }
    }    catch(error){
        console.log(error);
        return done(error);
    }
    }
    ))
}