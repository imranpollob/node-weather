const yargs = require('yargs')
const request = require('request')

const argv = yargs.options({
    location: {
        alias: 'l',
        describe: 'Location to fetch weather info',
        demandOption: true,
        type: 'string'
    }
}).argv

let getWeather = (latitude, longitude) => {
    let api = `https://api.darksky.net/forecast/117b04cdcb2a2b4d50fd43eea1ca92cd/${latitude},${longitude}?units=si&exclude=[minutely,hourly,daily,flags]`

    return new Promise((resolve, reject) => {
        request({
            url: api,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject('Weather Server Error')
            } else if (response.statusCode === 200 && body) {
                resolve({
                    summary: body.currently.summary,
                    temperature: body.currently.temperature,
                    feels: body.currently.apparentTemperature,
                    humidity: body.currently.humidity,
                    windSpeed: body.currently.windSpeed,
                })
            } else {
                reject('Sorry try again')
            }

        })
    })
}

let getLatLong = (location) => {
    let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoicG9sbG1peCIsImEiOiJjam9nejJ2ZDMwa2dzM3FscHJsa3JkaXNiIn0.wUV__8c9GnXAc0-JmuzLkg&limit=1`

    return new Promise((resolve, reject) => {
        request({
            url: api,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject('Location Server Error')
            } else if (response.statusCode === 200 && body) {
                resolve({
                    place: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                })
            } else {
                reject('Sorry try again')
            }

        })
    })
}


getLatLong(argv.location)
.then(res => {
    console.log(`Weather Update - ${res.place}\n`)
    return getWeather(res.latitude, res.longitude)
})
.then(res => {
    console.log(`${res.summary}\n`)
    console.log(`Temperature: ${res.temperature} ℃`)
    console.log(`Fells Like: ${res.feels} ℃`)
    console.log(`Humidity: ${res.humidity}`)
    console.log(`Wind Speed: ${res.windSpeed} meters per second `)
})
.catch(err => console.log(err))
