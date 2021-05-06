
const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done)=>{
        try{
            const user = await db.User.findOne({where:{id}}); // 백엔드는 db접속을 최소화 함
            return done(null, user);
        } catch(err) {
            console.log(err);
            return done(err);
        }
    });
    local();
}