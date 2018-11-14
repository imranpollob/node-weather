const request = require('request')

let get = (location, callback) => {
    let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoicG9sbG1peCIsImEiOiJjam9nejJ2ZDMwa2dzM3FscHJsa3JkaXNiIn0.wUV__8c9GnXAc0-JmuzLkg&limit=1`

    request({
        url: api,
        json: true
      }, function (error, response, body) {
        if (error) {
            callback('Server Error')
        } else if (response.statusCode === 200 && body) {
            callback(undefined, {
                place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0] 
            })
        } else {
            callback('Sorry try again')
        }
        
    });
}

module.exports = { get };