const request = require('request');

const forecast = (lat, long, callback) =>
{
    const url = 'https://api.darksky.net/forecast/0fc79e6ef7baea75565478a781864e5c/' + lat + ',' + long;
    request({url, json: true}, (error, {body}) =>
    {
        if (error)
        {
            callback('Unable to connect to weather service', undefined);
        }
        else if (body.error)
        {
            callback('Unable to find location', undefined);
        }
        else
        {
            callback(undefined, body.daily.data[0].summary
                                + 'Está atualmente ' + body.currently.temperature 
                                + ' graus Celsius. Tem ' 
                                + body.currently.precipProbability 
                                + '% chance de chover.')
        }
    });
}

module.exports = forecast;