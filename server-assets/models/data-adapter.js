let uuid = require('node-uuid'),
  JsData = require('js-data'),
  fbAdapter = require('js-data-firebase'),
  DS = new JsData.DS();

let adapter = new fbAdapter({
  basePath: 'https://beaglebone-weather.firebaseio.com/'
})

DS.registerAdapter('firebase', adapter, { default: true })


function formatQuery(query){
  query = query || ''
  return {
    with: query.split(',').join(' ').split(' ')
  }
}

module.exports = {
  DS,
  uuid,
  formatQuery
}