
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');
const {Strategy : LocalStrategy} = require('passport-local');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(userId, password, done) => {
        try {
            const exUser = await db.User.findOne({where:{email:userId}});
            if(!exUser) {
                return done(null, false, {reason:'존재하지 않는 사용자 입니다.'});
            }
            const result = await bcrypt.compare(password, exUser.password);
            if(result){
                return done(null, exUser);
            } else {
                return done(null, false, {reason:'비밀번호가 틀립니다.'}); // 콜백함수 (에러, 성공, 실패)
            }
        } catch(err){
            console.error(err);
            return done(err);
        }
    }));
}