//sets up Passport with a local authentication strategy, using a Person model for user

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/person'); //Adjust the path as method

passport.use(new LocalStrategy(async (Username, Password, done) => {
    //authentication logic
    try {
        // console.log('Received credentials:', Username, Password);
        console.log('Yes in try')
        const user = await Person.findOne({username: Username});
        if(!user)
            return done(null, false, {message: "Incorrect Username. "})

        const isPasswordMatch = await user.comparePassword(Password)
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password.'})
        }
    } catch (error) {
        console.log('Yes in catch')
        return done(error);
    }
}))

module.exports = passport;