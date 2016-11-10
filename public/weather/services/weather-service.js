function WeatherService(){

    var baseURL = '//boiseweather.herokuapp.com/'
    var weatherURL = 'api/weather/'
    this.weatherData = [];


    this.getWeathers = function getWeathers(daysToGoBack, iteration, that){ //Im a recursive nightmare
        that = that || this;
        iteration = iteration || 0;
        return new Promise((resolve, reject) =>{
            var date = new Date()
            date.setTime(Date.now() - (86400000 * iteration))
            var today = date.toString().substring(0, 15);
            $.get(baseURL + weatherURL + today).then(
                data => {
                    that.weatherData.push(data);
                    if(iteration == daysToGoBack - 1){
                        resolve(that.weatherData);
                    }else{
                        getWeathers(daysToGoBack, iteration + 1, that).then(
                            function(data){resolve(that.weatherData)},
                            function(err){resolve(that.weatherData)}
                        )
                    }
                },
                function(err){
                    reject(err);
                }
            )
        })
    }

    this.getTodayWeather = function getTodayWeather(){
        return weatherData[0];
    };

    this.getMultipleDayWeather = function getMultipleDayWeather(days){
        var tempWeather = {id: 'Three Day'};
        var tempArr = []
        for(var i = 0; i < days; i++){
            var readings = this.weatherData[i].readings;
            tempArr = tempArr.concat(readings);
        }
        tempWeather.readings = tempArr;
        return tempWeather;
    }

    

}