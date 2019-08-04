var signup = require('./signup');
var login = require('./login');
var User = require('../models/userModel');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    signup(passport);
    login(passport);
}