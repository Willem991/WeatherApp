import './style.css';

/*fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4a603b7b5dc8db404e7a58f050c81875")
.then(response => response.json())
.then(response => console.log(response));*/


const getInputData = async (city) => {

    
    let initialData = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=4a603b7b5dc8db404e7a58f050c81875");
    let data = await initialData.json();

    if(data.cod === "404"){
        console.log(data.message);
    }else{
        displayData(data);
    };

};

const displayData = async (data) => {
    let weather = data.weather[0].description;
    const mainImg = document.querySelector('#weatherImage')

    if(weather == 'overcast clouds'){
        mainImg.src = overcastcloud.png;
    }else if(weather == 'broken clouds'){
        mainImg.src = brokenclouds.png;
    }else if(weather == 'clear skye'){
        mainImg.src = clearsky.png;
    }


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