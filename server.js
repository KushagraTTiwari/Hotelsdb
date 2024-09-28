const express = require('express');
const app = express();
const db = require('./db')

// const Person = require('./models/person')
// const MenuItem = require('./models/MenuItem')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('welcome to my hotel....How can i help you?')
})



//imports the router file
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use the routers
app.use('/person', personRoutes)
app.use('/menuitems', menuRoutes)


app.listen(3000,()=>{
    console.log('server is active')
    console.log('listening at 3000')
});