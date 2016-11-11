function WeatherService(){

    var baseURL = '//boiseweather.herokuapp.com/'
    var weatherURL = 'api/weather/'
    var apiKey = '052c8f761a636457486b97ec6e54e76e';
    var conditionData;
    this.weatherData = [];
    var lat = 43.60007449999999;
    var lon = -116.23737749999998;


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
            if(readings){tempArr.unshift(readings)};
        }
        var parsedReadings = [];
        tempArr.forEach(item =>{
            item.forEach(reading => {
                parsedReadings.push(reading)
            })
        })
        tempWeather.readings = parsedReadings;
        return tempWeather;
    }

    this.getOpenWeatherMapStats = function getOpenWeatherMapStats(){
        return new Promise((resolve, reject) =>{
            if(conditionData){return resolve(conditionData)}
            $.get(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`)
            .then(data =>{
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            })
        })
    }

    this.getConditionString = function getConditionString(){
        return new Promise((resolve, reject) =>{
            this.getOpenWeatherMapStats()
            .then(data =>{
                var cs = '';
                if(data.weather[0].main == 'Thunderstorm'){
                    cs = `There is a thunderstorm today! You definitely will need an umbrella. Be careful out there! <i class="fa fa-bolt" style:"color: yellow" aria-hidden="true"></i>`
                }
                if(data.weather[0].main == 'Drizzle'){
                    cs = `There is a light drizzle outside. You may want to take an umbrella! <i class="fa fa-tint" style="color: blue" aria-hidden="true"></i>`
                }
                if(data.weather[0].main == 'Rain'){
                    cs = `It's raining outside! You should take an umbrella with you. Stay dry out there! <i class="fa fa-tint" style="color: blue" aria-hidden="true"></i>`
                }
                if(data.weather[0].main == 'Snow'){
                    cs = `It's snowing out there! Stay warm and drive safe! <i class="fa fa-snowflake-o" style:"color: blue" aria-hidden="true"></i>`
                }
                if(data.weather[0].main == 'Clear'){
                    cs = `The sky is nice and clear right now! <i class="fa fa-sun-o" style="color: orange" aria-hidden="true"></i>`
                }
                if(data.weather[0].main == 'Clouds'){
                    cs = `It's cloudy out there, but it isn't raining. <i class="fa fa-cloud" aria-hidden="true"></i>`
                }
                if(data.weather[0].main == 'Extreme'){
                    cs = "Wow! The weather is crazy out there! Be Safe!"
                }
                return resolve(cs);
            })
            .catch(err =>{
                return reject(err);
            });
        })
    }
    
}