const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Define paths for express config
const publicPath = path.join(__dirname, '../public');//Where is the public path
const viewsPath = path.join(__dirname, '../templates/views'); //Where the views is
const partialsPath = path.join(__dirname, '../templates/partials'); //Where the views is

const app = express();
const port = process.env.PORT || 3000;

//Setup hablebards engine
app.set('view engine', 'hbs');//Set the hbs to be rendered, and with that there is no need to use send
app.set('views', viewsPath); //Customize views path
hbs.registerPartials(partialsPath);

//Setup static directory serve
app.use(express.static(publicPath));//Where is the static things

app.get('', (req, res) =>
{
    res.render('index', 
    {
        title: 'Weather',
        name: 'Miguel Panuto'
    });
});

app.get('/about', (req, res) =>
{
    res.render('about', 
    {
        title: 'About',
        name: 'Miguel Panuto'
    });
});

app.get('/help', (req, res) =>
{
    res.render('help', 
    {
        title: 'Help',
        name: 'Miguel Panuto'
    });
});

app.get('/weather', (req, res) =>
{
    const address = req.query.location; //Picking the querry from url
    if (!address) //if there is no location
    {
        return res.send(
        {
            error: 'No location founded'
        });
    }
    
    geocode(address, (error, { latitude, longitude, location } = {}) => //Default value solve the problem, that was crashing the program
    {
        if (error)
        {
            return res.send({ error });
        }
            
        forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error)
                return res.send({ error });
            res.send(
            {
                forecast: forecastData,
                location,
                address
            });

        });
    }); 
});

app.get('/products', (req, res) =>
{
    if (!req.query.search)
    {
        return res.send(
        {
            error:'You mus provide search term.'
        });
    }
    console.log(req.query); //After the '?' on the link will have what the variable is and how much value, querry picks every variable from the link
    res.send(
    {
        products:[]
    });
});

app.get('/help/*', (req, res) =>
{
    res.render('404', 
    {
        title: 'Help',
        name: 'Miguel Panuto',
        text: 'Help article not found.' 
    });
});

app.get('*', (req, res) => // * for all pages, that is not finded, that goes to last that is because all other pages does not corresponds
{
    res.render('404', 
    {
        title: 'Weather',
        name: 'Miguel Panuto',
        text: 'Page not found.'
    });
});

app.listen(port, () => //Where is the port and a function that is the website
{
    console.log('Server is up on port ' + port);
});