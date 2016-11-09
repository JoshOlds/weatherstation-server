function WeatherService(){

    var baseURL = '//boiseweather.herokuapp.com/'
    var weatherURL = 'api/weather/'
    

    this.getTodayWeather = function getTodayWeather(){
        return new Promise(function (resolve, reject){
            var today = new Date(Date.now()).toString().substring(0, 15);
            $.get(baseURL + weatherURL + today).then(
                function(data){
                    resolve(data);
                },
                function (err){
                    reject(err);
                }
            )
        })
    };

    

}