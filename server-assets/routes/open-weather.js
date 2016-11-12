const router = require('express').Router();
const request = require('request')
module.exports.mountPath = '/open-weather'
module.exports.router = router;

let lat = 43.60007449999999;
let lon = -116.23737749999998;
let apiKey = '052c8f761a636457486b97ec6e54e76e';

router.route('/')

  .get(function (req, res, next) {
      var data = request.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`).pipe(res)
  })





