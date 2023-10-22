
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const connectDB = require('./server/config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./server/routes/auth');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');


const app = express();
const PORT = process.env.PORT || 9000;


app.use(session({
    secret: process.env.SECRET_KEY, // Replace with your secret key
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use(cookieParser());


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

//connection of database
connectDB();
app.use('/user', userRoutes);

app.use(express.static('public'));


app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');



app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));


app.get('*', function(req, res){
    res.status(404).render('404')
})

app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
})
