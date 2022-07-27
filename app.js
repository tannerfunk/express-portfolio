//adding variables to require the necessary dependencies
const express = require('express');
const path = require('path');

//this variable connects us to our data file
const data = require("./data.json");
const projects = data.projects

const app = express();

//setting the view engine to pug
app.set('view engine', 'pug');

//using static instead of public
app.use('/static', express.static(path.join(__dirname,'public')));

/*    This is throwing an error intentionally for testing purposes.
app.use((req, res, next) => {
    const err = new Error("Something went wrong!")
    err.status = 500;
    next(err);
});
*/

//index route
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//about route
app.get('/about', (req, res) => {
    res.render('about');
});

//project route
app.get('/project/:id', (req, res) => {
    //variables to hold our different peices of data based on the project id parameter
    const id = req.params.id;
    const name = projects[id].project_name;
    const desc = projects[id].description;
    const tech = projects[id].technologies;
    const link = projects[id].live_link;
    const github = projects[id].github_link;
    const images = projects[id].image_urls;

    //making it more concise
    const templateData = {id, name, desc, tech, link, github, images};

    //sending it to the project.pug file to be rendered with the object holding all our data!
    res.render(`project`, {templateData});
});

//if the code reaches here it means someone was tryna get to a page that does not exist...
app.use((req, res, next) => {
    const err = new Error('Not Found - I searched everywhere for this file and it is NOT here...');
    err.status = 404;
    
    //we're passing an error to next which means express will jump to the next middleware
    //has a parameter for err so it can call it... in this case it will always be not found.
    next(err);
});

//this error will catch all the rest! and it's what is used for the 404 Error
app.use((err, req, res, next)=> {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
    next();
});



app.listen(3000, () => {
    console.log('The application is running on localhost:3000...')
});