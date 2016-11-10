function ChartController() {
    var doneFlag = false;
    var weatherService = new WeatherService();
    weatherService.getWeathers(10).then(function(){doneFlag = true;})

    this.drawWeather = function drawWeather(celciusFlag, humidityFlag, days) {
        if(!doneFlag){
            setTimeout(function(){drawWeather(celciusFlag, humidityFlag, days)}, 500);
            return;
        }
        var parentElem = $('#chart-col'); //Blow away canvas before rewriting. Otherwise you get duplicates
        parentElem.html('');
        parentElem.html('<canvas id="weather-chart" class="weather-chart"></canvas>');
        ctx = $('#weather-chart')
        var weather = weatherService.getMultipleDayWeather(days).readings;

        var dataF = weather.map(item => {return item.tempF})
        var dataC = weather.map(item => {return item.tempC})
        if(celciusFlag){var dataT = dataC; var dataString = 'Temperature (*C)'}
        else{var dataT = dataF; var dataString = 'Temperature (*F)'}
        var dataH = weather.map(item => {return item.rh})
        var labels = weather.map(item => {
            var date = new Date(item.timeStamp);
            var placeholder = '';
            if(date.getMinutes() < 10){
                placeholder = '0';
            }
            var timeStamp = date.getHours() + `:${placeholder}` + date.getMinutes()
            return timeStamp;
        })
        var datasetT = {
                    label: dataString,
                    data: dataT,
                    fill: true,
                    borderWidth: 2,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0,0,128,0.1)'
                }
        var datasetH = {
                    label: 'Humidity (%RH)',
                    data: dataH,
                    fill: true,
                    borderWidth: 2,
                    borderColor: 'pink',
                    backgroundColor: 'rgba(128,0,0,0.3)'
                }

        var datasets = [];
        datasets.push(datasetT);
        if(humidityFlag){datasets.push(datasetH)}

        var data = {
            labels: labels,
            datasets: datasets
        }

        var todayWeatherChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                label: `Today's Weather`,
                xAxisID: `Time`,
                yAxisID: `Temperature (F)`
            }
        })
    }

}

