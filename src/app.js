const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ribhu'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'Created for LEARNING',
        name: 'Ribhu'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText:'Help!!! I need SOMEBODY.',
        title: 'Help page',
        name: 'Ribhu'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Error!! No address given.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
            
            
        })
    })
    // res.send({
    //     weather: "Current Weather",
    //     address: req.query.address
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Ribhu',
        errorMessage: 'Help documentation not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Ribhu',
        errorMessage: 'Page not found!'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})