import { HttpClient } from '@angular/common/http';
import { BuiltinTypeName, R3ResolvedDependencyType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  value:any;
  WeatherData:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.WeatherData = {
      main : {},
      isDay: true,
    };    
    this.getWeatherData();
    /* console.log(this.WeatherData); */
    
    setTimeout(
      function(){ 
      location.reload(); 
      }, 900000);
   
    
  }
  
  update(value: string) {
    this.value = value;
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=cf3a1d110507bcdf112f817e029f0d5a&lang=da`)
    .subscribe(data => {
      console.log(data);
      this.setWeatherData(data)
    })
  } 

  getWeatherData() {
   fetch('https://api.openweathermap.org/data/2.5/weather?q=københavn&appid=cf3a1d110507bcdf112f817e029f0d5a&lang=da')
   .then(respond => respond.json())
   .then(data => this.setWeatherData(data))
  }  

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.isClear = (this.WeatherData.weather[0].description === "klar himmel" || this.WeatherData.weather[0].main === "Rain");    
    this.WeatherData.rain = (this.WeatherData.weather[0].main === "Rain");    
    this.WeatherData.clouds = (this.WeatherData.weather[0].description);    
    this.WeatherData.windspeed = (this.WeatherData.wind.speed);
    if (this.WeatherData.windspeed < 0.2) {
      this.WeatherData.windspeed = "Stille";
    }else if (this.WeatherData.windspeed < 1.5) {
      this.WeatherData.windspeed = "Næsten stille";
    }
    else if (this.WeatherData.windspeed < 3.3) {
      this.WeatherData.windspeed = "Svag vind";
    }
    else if (this.WeatherData.windspeed < 5.4) {
      this.WeatherData.windspeed = "Let vind";
    }
    else if (this.WeatherData.windspeed < 7.9) {
      this.WeatherData.windspeed = "Jævn vind";
    }
    else if (this.WeatherData.windspeed < 10.7) {
      this.WeatherData.windspeed = "Frisk vind";
    }
    else if (this.WeatherData.windspeed < 13.8) {
      this.WeatherData.windspeed = "Hård vind";
    }
    else if (this.WeatherData.windspeed < 17.1) {
      this.WeatherData.windspeed = "Kuling";
    }
    else if (this.WeatherData.windspeed < 20.7) {
      this.WeatherData.windspeed = "Hård kuling";
    }
    else if (this.WeatherData.windspeed < 24.4) {
      this.WeatherData.windspeed = "Stormende kuling";
    }
    else if (this.WeatherData.windspeed < 28.4) {
      this.WeatherData.windspeed = "Storm";
    }
    else if (this.WeatherData.windspeed < 32.6) {
      this.WeatherData.windspeed = "Stærk storm";
    }
    else if (this.WeatherData.windspeed > 32.6) {
      this.WeatherData.windspeed = "Orkan";
    }

  }
  
}
