import './style.css';

fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4a603b7b5dc8db404e7a58f050c81875")
.then(response => response.json())
.then(response => console.log(response));