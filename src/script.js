//functio that updates the city info based on user input search

function updateWeatherData(response) {
  let date = new Date(); //make a time element
  let day = date.getDay();
  let temperature = Math.round(response.data.daily[day].temperature.day);
  let city = response.data.city;
  let weatherDescription = response.data.daily[day].condition.description;
  let humidity = response.data.daily[day].temperature.humidity;
  let wind = response.data.daily[day].wind.speed;
  let time =
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

  let temperatureElementDisplay = document.querySelector("#todays-temp");
  temperatureElementDisplay.innerHTML = temperature;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;

  let currentWeatherDescription = document.querySelector("#weather-info");
  currentWeatherDescription.innerHTML = weatherDescription;

  let currentHumidity = document.querySelector("#humidity-value");
  currentHumidity.innerHTML = humidity;

  let currentWindSpeed = document.querySelector("#windspeed-value");
  currentWindSpeed.innerHTML = wind;

  let currentTime = document.querySelector("#current-time-value");
  currentTime.innerHTML = time;
}
//function that gets the right city info form API
function citySearch(city) {
  let key = "7332a37bdbaf02c4010b2fbtf44ao35f";
  let rootURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  console.log(rootURL);
  axios.get(rootURL).then(updateWeatherData);
}

//function that handels change of city
function changeCity(event) {
  event.preventDefault(); //the page does not reload automaticly
  let searchInput = document.querySelector("#search-area"); //get the search input from user

  citySearch(searchInput.value);
}

//get the search form
let searchFormElement = document.querySelector("#search-tab");
searchFormElement.addEventListener("submit", changeCity); //add eventlistner when submit is activated and call function

citySearch("Oslo");
