const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f3d855db6b3b137b866ca8d877149c4&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees. " + "Current humidity is " + body.current.humidity + "%. ")
        }
    })
}

module.exports = forecast
