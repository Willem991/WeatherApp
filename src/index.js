import './style.css';
import overcastcloud from './overcastcloud.png';
import brokenclouds from './brokenclouds.png';
import clearsky from './clearsky.png';
import rain from './rain.png';
import thunder from './thunder.png';
import snow from './snow.png';

/*fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4a603b7b5dc8db404e7a58f050c81875")
.then(response => response.json())
.then(response => console.log(response));*/


const getInputData = async (city) => {

    
    let initialData = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ",southafrica&APPID=4a603b7b5dc8db404e7a58f050c81875");
    let data = await initialData.json();

    if(data.cod === "404"){
        console.log(data.message);
    }else{
        displayData(data);
    };

};

const displayData = async (data) => {
    //Extracting the data
    let weather = data.weather[0].description;
    let weatherM = data.weather[0].main;
    let city = data.name;
    let temperature = Math.round(data.main.temp-273.15);
    let sunrise = new Date(parseInt(data.sys.sunrise)*1000);
    let sunset = new Date(parseInt(data.sys.sunset)*1000);
    let minTemp = Math.round(data.main.temp_min-273.15);
    let maxTemp = Math.round(data.main.temp_max-273.15);

    //Getting the html elements
    const mainImg = document.querySelector('#weatherImage');
    const cityHeading = document.querySelector('#city');
    const temperatureHeading = document.querySelector('#temperature');
    const weatherHeading = document.querySelector('#description');
    const sunriseHeading = document.querySelector('#sunrise');
    const sunsetHeading = document.querySelector('#sunset');
    const minTempHeading = document.querySelector('#low');
    const maxTempHeading = document.querySelector('#high');

    //Assigning the data to the html elements
    if(weather == 'overcast clouds'){
        mainImg.src = overcastcloud;
    }else if(weather == 'broken clouds' || weather == 'scattered clouds:' || weather == 'few clouds'){
        mainImg.src = brokenclouds;
    }else if(weather == 'clear sky'){
        mainImg.src = clearsky;
    }else if(weatherM == 'Rain'){
        mainImg.src = rain;
    }else if(weatherM == 'Drizzle'){
        mainImg.src = rain;
    }else if(weatherM == 'Thunderstorm'){
        mainImg.src = thunder;
    }else if(weatherM == 'Snow'){
        mainImg.src = snow;
    };

    cityHeading.textContent = city;

    temperatureHeading.textContent ="Temp: " + temperature + '°';

    weatherHeading.textContent = "Weather: " + weather;

    sunriseHeading.textContent = "Sunrise: " + sunrise;

    sunsetHeading.textContent = "Sunset: " + sunset;

    minTempHeading.textContent = "Minimum: " + minTemp + '°';

    maxTempHeading.textContent = "Maximum: " + maxTemp + '°'; 

    console.log(data, "hello");
};

const events = (() => {

    search.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            const search = document.querySelector('#search');
            let city = search.value;
            let data = await getInputData(city);
        }
    });
})();