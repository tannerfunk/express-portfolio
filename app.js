//adding variables to require the necessary dependencies
const express = require('express');
const path = require('path');

const data = require("data.json");

//const { projects } = require('data.json');
//const { application } = require('express');

const app = express();


app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('/about');
});

/*app.get('/project', (req, res) => {
    res.render(`/project/${project.id}`);
})*/


app.listen(3000, () => {
    console.log('The application is running on localhost:3000...')
});