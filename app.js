//adding variables to require the necessary dependencies
const express = require('express');
const path = require('path');

const data = require("./data.json");

const projects = data.projects

//const { projects } = require('data.json');
//const { application } = require('express');

const app = express();
const heading = "Tanner Funk";

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const name = projects[id].project_name;
    const desc = projects[id].description;
    const tech = projects[id].technologies;
    const link = projects[id].live_link;
    const github = projects[id].github_link;
    const images = projects[id].image_urls;

    const templateData = {id, name, desc, tech, link, github, images};


    res.render(`project`, {templateData});
})


app.listen(3000, () => {
    console.log('The application is running on localhost:3000...')
});