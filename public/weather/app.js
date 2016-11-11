console.log("app.js initialized")
var chartController = new ChartController();
var celciusFlag = false;
var humidityFlag = false;
var dayFormat = 1;

updateWeather();

function updateWeather(){
   chartController.drawWeather(celciusFlag, humidityFlag, dayFormat)
}

$('#temp-format-c').change(() =>{
    celciusFlag = true;
    updateWeather();
});

$('#temp-format-f').change(() =>{
    celciusFlag = false;
    updateWeather();
});

$('#humidity-check').change(() =>{
    humidityFlag = !humidityFlag;
    updateWeather();
});

$('#weather-range').change( () =>{
    dayFormat = $('#weather-range').val();
    updateWeather();
});