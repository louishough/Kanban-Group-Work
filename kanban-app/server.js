
const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const port = 3000;
const {User, Project, Task} = require('./data/database');

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('styles'));
app.use(express.static('views/images'));
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Login 
app.get('/', async (req, res) => {
    // data
    res.render('login', {})
});

// TaskList
app.get('/tasklist', async (req, res) => {
    //data
    res.render('tasklist', {})
});

// TaskList
app.get('/projects', async (req, res) => {
    //data
    res.render('projects', {})
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })