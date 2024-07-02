// Assignment 12
// Weather App

// https://drive.google.com/file/d/1p4kFWheWECAdtZOrwmg2uyUnoaK-bVSp/view
// https://www.weatherapi.com/
// https://routeweather.netlify.app/

let forecast = document.getElementById('forecast');
let searchCity = document.getElementById('search');
let submitBtn = document.getElementById('submit');

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const directions = {
N: "North",
NNE: "North-Northeast", 
NE: "Northeast", 
ENE: "East-Northeast", 
E: "East", 
ESE: "East-Southeast", 
SE: "Southeast", 
SSE: "South-Southeast", 
S: "South", 
SSW: "South-Southwest", 
SW: "Southwest", 
WSW: "West-Southwest", 
W: "West", 
WNW: "West-Northwest", 
NW: "Northwest", 
NNW: "North-Northwest"
}

async function getWether(city){
    const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=987d78e727064806aac113803242506&q=${city}&days=3&aqi=no&alerts=no`, {
        method:'get',
        cache: 'default'
    })

    if(result.status != 200){
        Swal.fire({
            title: "error",
            text: "Something wrong",
            icon: "error"
          });
        return;
    }
    
    const response = await result.json();
    console.log(response);

    displayWether(response);
}

function displayWether(response){
    let date = new Date(response.location.localtime);
    let day = date.getDay();
    let month = months[date.getMonth()];

    let code = `
    <div class="today forecast">
              <div class="forecast-header" id="today">
                <div class="day">${weekday[date.getDay()]}</div>
                <div class="date">${day + month}</div>
              </div>
              <!-- .forecast-header -->
              <div class="forecast-content" id="current">
                <div class="location">${response.location.name}</div>
                <div class="degree">
                  <div class="num">${response.forecast.forecastday[0].hour[date.getHours()].temp_c}<sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img src="https:${response.forecast.forecastday[0].hour[date.getHours()].condition.icon}" alt="" width="90" />
                  </div>
                </div>
                <div class="custom">${response.forecast.forecastday[0].hour[date.getHours()].condition.text}</div>
                <span class="humidity">
                  <img src="Assets/Images/icon-umberella.png" alt=""/>
                  ${response.forecast.forecastday[0].hour[date.getHours()].humidity}%
                </span>
                <span class="windKph">
                  <img src="Assets/Images/icon-wind.png" alt="" />
                  ${response.forecast.forecastday[0].hour[date.getHours()].wind_kph}km/h
                </span>
                <span class="windDir">
                  <img src="Assets/Images/icon-compass.png" alt="" />
                  ${directions[response.forecast.forecastday[0].hour[date.getHours()].wind_dir]}
                </span>
              </div>
            </div>
            <div class="forecast">
              <div class="forecast-header">
                <div class="day">${weekday[date.getDay() + 1]}</div>
              </div>
              <!-- .forecast-header -->
              <div class="forecast-content">
                <div class="forecast-icon">
                  <img
                    src="https:${response.forecast.forecastday[1].hour[date.getHours()].condition.icon}"
                    alt=""
                    width="48"
                  />
                </div>
                <div class="degree">${response.forecast.forecastday[1].hour[date.getHours()].temp_c}<sup>o</sup>C</div>
                <small>${response.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup></small>
                <div class="custom">${response.forecast.forecastday[1].hour[date.getHours()].condition.text}</div>
              </div>
            </div>
            <div class="forecast">
              <div class="forecast-header">
                <div class="day">${weekday[date.getDay() + 2]}</div>
              </div>
              <!-- .forecast-header -->
              <div class="forecast-content">
                <div class="forecast-icon">
                  <img
                    src="https:${response.forecast.forecastday[2].hour[date.getHours()].condition.icon}"
                    alt=""
                    width="48"
                  />
                </div>
                <div class="degree">${response.forecast.forecastday[2].hour[date.getHours()].temp_c}<sup>o</sup>C</div>
                <small>${response.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup></small>
                <div class="custom">${response.forecast.forecastday[2].hour[date.getHours()].condition.text}</div>
              </div>
            </div>
    `;
    forecast.innerHTML = code;
}

function sucess(location){
    getWether(`${location.coords.latitude},${location.coords.longitude}`);
}

function error(){
    getWether('cairo');
}

window.addEventListener('load', function(){
    navigator.geolocation.getCurrentPosition(sucess, error);
})

searchCity.addEventListener('blur', function(){
    if(searchCity.value != ''){
        getWether(this.value);
    }
})

searchCity.addEventListener('keyup', function(e){
    if(e.key == 'Enter' && searchCity.value != ''){
        getWether(this.value);
    }
})

submitBtn.addEventListener('click', function(){
    if(searchCity.value != ''){
        getWether(searchCity.value);
    }
})