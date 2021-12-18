const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server log.')
    })
    console.log(log)
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (string) => {
    return string.toUpperCase();
});

app.listen(3000, () => console.log("Listening on Port 3000"));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home",
        welcomeMessage: "Welcome to the website",
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About page",
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to process request."
    })
})