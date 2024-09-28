const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();

// const Person = require('./models/person')
// const MenuItem = require('./models/MenuItem')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('welcome to my hotel....How can i help you?')
})



//imports the router file
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use the routers
app.use('/person', personRoutes)
app.use('/menuitems', menuRoutes)


app.listen(PORT,()=>{
    console.log('server is active')
    console.log('listening at 3000')
});