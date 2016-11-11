function ChartController() {
    var doneFlag = false;
    var weatherService = new WeatherService();
    var me = this;
    weatherService.getWeathers(10).then(function(){doneFlag = true;})

    this.drawWeather = function drawWeather(celciusFlag, humidityFlag, days) {
        if(!doneFlag){
            setTimeout(function(){drawWeather(celciusFlag, humidityFlag, days)}, 500);
            return;
        }
        me.updateConditionString();
        var parentElem = $('#chart-col'); //Blow away canvas before rewriting. Otherwise you get duplicates
        parentElem.html('');
        parentElem.html('<canvas id="weather-chart" class="weather-chart"></canvas>');
        ctx = $('#weather-chart')
        var weather = weatherService.getMultipleDayWeather(days).readings;
        var multiDayFlag = false;

        if(weather.length > 96){ // Max length of 96 data points
            multiDayFlag = true;
            var intervals = Math.floor(weather.length / 96)
            weather = weather.filter((val, index) => {
                return (index % (intervals + 1)) == 0;
            })
        }

        var dataF = weather.map(item => {return item.tempF})
        var dataC = weather.map(item => {return item.tempC})
        if(celciusFlag){var dataT = dataC; var dataString = 'Temperature (*C)'; me.updateStats(dataC);}
        else{var dataT = dataF; var dataString = 'Temperature (*F)'; me.updateStats(dataF);}
        var dataH = weather.map(item => {return item.rh})
        var labels = weather.map(item => {
            var date = new Date(item.timeStamp);
            var placeholder = '';
            if(date.getMinutes() < 10){
                placeholder = '0';
            }
            var timeStamp = date.toString().substring(0, 11) + " - " + date.getHours() + `:${placeholder}` + date.getMinutes()
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
        if(celciusFlag){datasetT.borderColor = 'limeGreen'; datasetT.backgroundColor = 'rgba(0,128,0,0.1)'}

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

    this.updateStats = function updateStats(dataSet){
        var highElem = $('#high');
        var lowElem = $('#low');
        var avgElem = $('#average');
        var high = dataSet[0];
        var low = dataSet[0];
        var average = 0;

        dataSet.forEach(item =>{
            if(item > high){high = item}
            if(item < low){low = item}
            average += Number(item)
        })
        average = average / dataSet.length;

        highElem.html(`High: ${high} <i class="fa fa-sun-o" aria-hidden="true"></i>`)
        lowElem.html(`Low: ${low} <i class="fa fa-snowflake-o" aria-hidden="true"></i>`)
        avgElem.html(`Avg: ${average.toFixed(2)} <i class="fa fa-smile-o" aria-hidden="true"></i>`)
    }

    this.updateConditionString = function updateConditionString(){
        var conditionElem = $('#condition-string')
        weatherService.getConditionString()
        .then(data =>{
            return conditionElem.html(data);
        })
        .catch(function(){console.error('Could not get condition data!')})
    }

}

