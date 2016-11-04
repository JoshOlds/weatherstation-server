const router = require('express').Router();
const Weather = require('../models/weather-model');

module.exports.mountPath = '/weather'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Weather.getById(req.params.id, req.query.include, function (weather) {
        if(weather.stack) { return next(weather) }
        return res.send(weather)
      })
    } else {
      Weather.getAll(req.query.include, function (weather) {
        if(weather.stack) { return next(weather) }
        return res.send(weather);
      });
    }
  })

  .post(function (req, res, next) {
    Weather.create(req.body, function (weather) {
      if(weather.stack) { return next(weather) }
      return res.send(weather)
    })
  })




