var signup = require('./signup');
var login = require('./login');
var User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });
    signup(passport);
    login(passport);
}