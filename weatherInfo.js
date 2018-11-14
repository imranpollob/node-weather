const request = require('request')

let get = (latitude, longitude, callback) => {
    let api = `https://api.darksky.net/forecast/117b04cdcb2a2b4d50fd43eea1ca92cd/${latitude},${longitude}?units=si&exclude=[minutely,hourly,daily,flags]`

    request({
        url: api,
        json: true
      }, function (error, response, body) {
        if (error) {
            callback('Server Error')
        } else if (response.statusCode === 200 && body) {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                feels: body.currently.apparentTemperature,
                humidity: body.currently.humidity,
                windSpeed: body.currently.windSpeed,
            })
        } else {
            callback('Sorry try again')
        }
        
    });
}

module.exports = { get };