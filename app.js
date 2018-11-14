const yargs = require('yargs')

const locationInfo = require('./locationInfo')
const weatherInfo = require('./weatherInfo')

const argv = yargs.options({
    location: {
        alias: 'l',
        describe: 'Location to fetch weather info',
        demandOption: true,
        type: 'string'
    }
}).argv

locationInfo.get(argv.location, (error, response) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Weather Update - ${response.place}\n`)
        weatherInfo.get(response.latitude, response.longitude, (error, response) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`${response.summary}\n`)
                console.log(`Temperature: ${response.temperature} ℃`)
                console.log(`Fells Like: ${response.feels} ℃`)
                console.log(`Humidity: ${response.humidity}`)
                console.log(`Wind Speed: ${response.windSpeed} meters per second `)
            }
        })

    }
})