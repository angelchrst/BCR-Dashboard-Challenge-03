const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const router = require('./router');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router);

// set view engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// home route
app.get('/', (req, res) => {
    res.render('login');
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { 
        title: 'Dashboard',
        title_nav: 'Dashboard',
        title_nav_B: 'DASHBOARD',
     });
})

app.get('/cars', (req, res) => {
    res.render('cars', { 
        title: 'Cars',
        title_nav: 'List Car',
        title_nav_B: 'CARS',
        side_menu_aktif: '/img/cars-aktif.svg'
     });
})

app.get('/add-new-car', (req, res) => {
    res.render('add-new-car', { 
        title: 'Add New Car',
        title_nav: 'List Car',
        title_nav_B: 'CARS',
        side_menu_aktif: '/img/cars-aktif.svg'
     });
})

app.listen(port, () => {
    console.log("Server running on port 8000");
});