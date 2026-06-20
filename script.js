const API_KEY = "82816c9e3b9a758f6ab026d2d5edb53c";

const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

async function getWeather(city){

try{

const response =
await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
);

const data =
await response.json();

if(data.cod !== 200){
alert("City not found");
return;
}

document.getElementById(
"temperature"
).innerText =
Math.round(data.main.temp)+"°";

document.getElementById(
"city"
).innerText =
data.name;

document.getElementById(
"condition"
).innerText =
data.weather[0].description;

document.getElementById(
"humidity"
).innerText =
data.main.humidity+"%";

document.getElementById(
"wind"
).innerText =
data.wind.speed+" km/h";

document.getElementById(
"feels"
).innerText =
Math.round(
data.main.feels_like
)+"°";

document.getElementById(
"pressure"
).innerText =
data.main.pressure;

document.getElementById(
"weatherIcon"
).src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

document.getElementById(
"weatherMap"
).src =
`https://maps.google.com/maps?q=${data.name}&output=embed`;

}catch(err){

console.log(err);

}

}

searchBtn.addEventListener(
"click",
()=>{
const city =
cityInput.value.trim();

if(city){
getWeather(city);
}
}
);

cityInput.addEventListener(
"keypress",
(e)=>{
if(e.key==="Enter"){
searchBtn.click();
}
}
);

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

async(pos)=>{

const lat =
pos.coords.latitude;

const lon =
pos.coords.longitude;

const res =
await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
);

const data =
await res.json();

getWeather(data.name);

},

()=>{
getWeather("Delhi");
}

);

}else{

getWeather("Delhi");

}
