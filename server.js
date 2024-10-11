const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();
const passport = require('./auth')
// const LocalStrategy = require('passport-local').Strategy;

// const Person = require('./models/person')
// const MenuItem = require('./models/MenuItem')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest)

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})


app.get('/', function(req, res){
    res.send('welcome to my hotel....How can i help you?')
})



//imports the router file
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use the routers
app.use('/person', personRoutes)
app.use('/menuitems', localAuthMiddleware, menuRoutes)


app.listen(PORT,()=>{
    console.log(`server listing at port ${PORT}`)
});