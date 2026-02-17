//function that updates the city info based on user input search
function updateWeatherData(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let weatherDescription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);
  let icon = `<img src="${response.data.condition.icon_url}"></img>`;

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

  let currentDayInfo = document.querySelector("#date-and-day-info");
  currentDayInfo.innerHTML = formatDate(date);

  let currentIcon = document.querySelector("#current-icon");
  currentIcon.innerHTML = icon;

  getForecastData(response.data.city);
}

function formatDay(day) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let dayofWeek = days[day.getDay()];

  return dayofWeek;
}

//function that displays forecast
function displayForcast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let innertHtml = "";

  response.data.daily.forEach((element, index) => {
    if (index < 5) {
      let date = new Date(element.time * 1000);
      let day = formatDay(date);
      let minTemp = Math.round(element.temperature.minimum);
      let maxTemp = Math.round(element.temperature.maximum);
      let icon = `<img src="${element.condition.icon_url}"></img>`;

      innertHtml =
        innertHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">${icon}</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${minTemp}º</strong>
          </div>
          <div class="weather-forecast-temperature">${maxTemp}º</div>
        </div>
      </div>`;
    }
  });

  forecastElement.innerHTML = innertHtml;
}

function formatDate(date) {
  //array of all days of the week
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //get the right day
  let day = days[date.getDay()];
  let dato = date.getDate();
  let month = months[date.getMonth()];

  let time =
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

  return `${day} ${dato}.${month} ${time} `;
}

//function that gets the right city info form API
function citySearch(city) {
  let key = "7332a37bdbaf02c4010b2fbtf44ao35f";

  //API url for current day
  let currentCityUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(currentCityUrl).then(updateWeatherData);
  console.log(currentCityUrl);
}

//function that handels change of city
function changeCity(event) {
  event.preventDefault(); //the page does not reload automaticly
  let searchInput = document.querySelector("#search-area"); //get the search input from user

  citySearch(searchInput.value);
}

function getForecastData(city) {
  let key = "7332a37bdbaf02c4010b2fbtf44ao35f";

  //API url for forecast data
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}`;
  axios.get(apiURL).then(displayForcast);
}

//get the search form
let searchFormElement = document.querySelector("#search-tab");
searchFormElement.addEventListener("submit", changeCity); //add eventlistner when submit is activated and call function

citySearch("Oslo");
