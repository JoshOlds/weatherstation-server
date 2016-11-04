let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;

let Weather = DS.defineResource({
  name: 'weather',
  endpoint: 'weather'
})

/*
Example weather object
exampleWeather = {
    dateStamp: date
    reading: {
        tempF: 50.02,
        tempC: 10.10,
        rh: 49.01
    }
}
*/


function create(weather, cb) {
    // Use the Resource Model to create a new weather entry
    if(!weather.dateStamp || !weather.reading){
        return new Error("Invalid weather format")
    }
    let dateStamp = weather.dateStamp;
    let tempF = weather.reading.tempF.toFixed(2);
    let tempC = weather.reading.tempF.toFixed(2);
    let rh = weather.reading.rh.toFixed(2);

    let cleanWeather = { id: uuid.v4(), dateStamp: dateStamp, reading:{tempF: tempF, tempC: tempC, rh: rh} }
    Weather.create(cleanWeather).then(cb).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Galaxies
  Weather.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single weather reading by its id
  Weather.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}

