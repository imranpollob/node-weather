const yargs = require('yargs')
const axios = require('axios')

const argv = yargs.options({
    location: {
        alias: 'l',
        describe: 'Location to fetch weather info',
        demandOption: true,
        type: 'string'
    }
}).argv

let geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(argv.location)}.json?access_token=pk.eyJ1IjoicG9sbG1peCIsImEiOiJjam9nejJ2ZDMwa2dzM3FscHJsa3JkaXNiIn0.wUV__8c9GnXAc0-JmuzLkg&limit=1`

axios.get(geocodeUrl)
    .then((response) => {
        if (response.status !== 200) {
            throw new Error('Unable to find that address.');
        }

        console.log(response.data.features[0].place_name);

        var latitude = response.data.features[0].center[1];
        var longitude = response.data.features[0].center[0];
        let weatherUrl = `https://api.darksky.net/forecast/117b04cdcb2a2b4d50fd43eea1ca92cd/${latitude},${longitude}?units=si&exclude=[minutely,hourly,daily,flags]`

        return axios.get(weatherUrl);
    })
    .then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
        console.log(e);
    });