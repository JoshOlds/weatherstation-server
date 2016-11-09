console.log("app.js initialized")
var chartController = new ChartController();

chartController.getWeather()
    .then(chartController.drawTodayWeather)
    //.catch(function(err){console.error(err)})