async function searchCity(city="London"){
    let info = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ed776d5687e4399a5405051241504&q=${city}&days=3`)
    let finalInfo = await info.json()
    console.log(finalInfo)
    displayCurrentCity(finalInfo.location,finalInfo.current)
    displyComingDays(finalInfo)
}
document.querySelector(".find").addEventListener("keyup", function(e) {
    searchCity(e.target.value);
});
document.querySelector(".btn-find").addEventListener("click", function(e) {
    if (document.querySelector(".find").value != ""){
        searchCity(document.querySelector(".find").value);
        console.log(document.querySelector(".find").value)
    }
});
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let directions= {
    "N": "North",
    "NE": "North-East",
    "E": "East",
    "SE": "South-East",
    "S": "South",
    "SW": "South-West",
    "W": "West",
    "NW": "North-West"
}
function displayCurrentCity(location, current){
    //console.log(location, current)
    let day = new Date(current.last_updated).getDay();
    let month = new Date(current.last_updated).getMonth();
    let content = `<div class="today forecast">
                        <div class="forecast-header d-flex justify-content-between">
                            <div class="day">${weekday[day]}</div>
                            <div class="date">${month + months[month]}</div>
                        </div>
                        <div class="forecast-content">
                            <div class="location">${location.name}</div>
                            <div class="degree d-flex justify-content-between">
                                <div class="num">
                                    ${current.temp_c}
                                    <sup>o</sup>
                                    C
                                </div>
                                <div class="icon">
                                    <img src="https:${current.condition.icon}" />
                                </div>
                            </div>
                            <div class="custom"> ${current.condition.text}</div>
                            <span><i class="fa-solid fa-umbrella"></i> ${current.humidity}%</span>
                            <span><i class="fa-solid fa-wind"></i> ${current.wind_kph}km/h</span>
                            <span><i class="fa-regular fa-compass"></i> ${directions[current.wind_dir]}</span>
                        </div>
                    </div>`;
    document.querySelector(".forecast-items").innerHTML = content;
}
function displyComingDays(cDays){
    console.log(cDays.forecast.forecastday.length);
    let day = new Date(cDays.current.last_updated).getDay();
    for(let i = 1; i < cDays.forecast.forecastday.length;i++){
        let content = `<div class="forecast">
                            <div class="forecast-header text-center">
                                <div class="day">${weekday[day+i]}</div>
                            </div>
                            <div class="forecast-content">
                                <div class="total-degree d-flex flex-column justify-content-center align-items-center">
                                    <div class="icon">
                                    <img src="https:${cDays.forecast.forecastday[i].day.condition.icon}" alt="">
                                    </div>
                                    <div class="max-temp fs-2 fw-bold text-white">
                                        ${cDays.forecast.forecastday[i].day.maxtemp_c}
                                        <sup>o</sup>
                                        C
                                    </div>
                                    <div class="min-temp fs-6">
                                        ${cDays.forecast.forecastday[i].day.mintemp_c}
                                        <sup>o</sup>
                                    </div>
                                    <div class="custom py-2">${cDays.forecast.forecastday[i].day.condition.text}</div>
                                </div>
                                
                            </div>
                        </div>`;
        document.querySelector(".forecast-items").innerHTML += content;
    }
}
async function success(location){
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    let url = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    let data = await url.json();
    searchCity(data.city)
    console.log(data.city)
}

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(success)
}
getCurrentLocation()