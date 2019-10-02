const request = require('request');

const geocode = (adress, callback) => 
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibXJjbG9ja3MiLCJhIjoiY2sxNnE0Y2s2MThiOTNscWRwenN6NXEwcSJ9.u_fJ-5wAfcOWV7W1kJfW6w&limit=1';
    request({url, json: true}, (error, {body}) =>
    {
        if(error)
        {
            callback('Unable to connect to location services!', undefined);
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find location', undefined);
        }
        else
        {
            callback(undefined, 
            {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;