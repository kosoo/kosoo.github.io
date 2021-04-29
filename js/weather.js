const API_KEY = "fd5033de2073e6ad51ba575bba76f7a8"
const COORDS = 'coords';
const weather = document.querySelector('.js-weather');

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`        
    ).then(function(response) {
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}° | ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handlerGeoSuccess(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
        latitude: lat,
        longitude: lon
    };
    saveCoords(coordsObj);
    getWeather(lat, lon)
}

function handlerGeoError(){
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handlerGeoSuccess, handlerGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init() {
  loadCoords();
}

init();
