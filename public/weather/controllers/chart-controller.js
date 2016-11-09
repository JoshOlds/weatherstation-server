function ChartController() {
    var weatherService = new WeatherService();
    var todayWeather = [];
    var threeDayWeather = [];
    var tenDayWeather = [];
    var ctx = $('#weather-chart')

    this.getWeather = function getWeather() {
        return new Promise(function (resolve, reject) {
            weatherService.getTodayWeather()
                .then((data) => {
                    console.log('Todays Weather: ')
                    console.log(data);
                    todayWeather = data.readings;
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    this.drawTodayWeather = function drawTodayWeather() {
        var dataF = todayWeather.map(item => {return item.tempF})
        var dataC = todayWeather.map(item => {return item.tempC})
        var dataH = todayWeather.map(item => {return item.rh})
        var labels = todayWeather.map(item => {
            var date = new Date(item.timeStamp);
            var placeholder = '';
            if(date.getMinutes() < 10){
                placeholder = '0';
            }
            var timeStamp = date.getHours() + `:${placeholder}` + date.getMinutes()
            return timeStamp;
        })
        var data = {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature (*F)',
                    data: dataF,
                    fill: true,
                    borderWidth: 2,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0,0,128,0.1)'
                },
                {
                    label: 'Humidity (%RH)',
                    data: dataH,
                    fill: true,
                    borderWidth: 2,
                    borderColor: 'pink',
                    backgroundColor: 'rgba(128,0,0,0.3)'
                }
            ]
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

