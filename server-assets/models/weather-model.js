let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;

let Weather = DS.defineResource({
  name: 'weather',
  endpoint: 'weather'
})

function create(weather, cb) {
    // Use the Resource Model to create a new weather entry
    if(!weather.dateStamp || !weather.reading){
        return new Error("Invalid weather format")
    }
    let dateStamp = weather.dateStamp;
    let dateId = new Date(dateStamp).toString().substring(0, 15);
    let tempF = weather.reading.tempF.toFixed(2);
    let tempC = weather.reading.tempC.toFixed(2);
    let rh = weather.reading.rh.toFixed(2);
    let reading = {timeStamp: dateStamp, tempF: tempF, tempC: tempC, rh: rh, location:{lat: weather.reading.location.lat, lon: weather.reading.location.lon}}

    getById(dateId, "",  data => {
      if(data.message){ //First post of day
        let post = {id: dateId, readings: [reading]}
        Weather.create(post).then(cb).catch(cb);
      }else{
        let readings = data.readings;
        readings.push(reading);
        let post = {id: dateId, readings: readings};
        Weather.create(post).then(cb).catch(cb);
      }
    })
    
}

function getAll(query, cb) {
  //Use the Resource Model to get all weather
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

