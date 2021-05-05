const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    });
    passport.deserializeUser(() => {
        
    })
}