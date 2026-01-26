//functio that updates the city info based on user input search

function updateWeatherData(response) {
  let temperature = Math.round(response.data.daily[0].temperature.day);

  let temperatureElementDisplay = document.querySelector("#todays-temp");
  temperatureElementDisplay.innerHTML = temperature;
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

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;
  citySearch(searchInput.value);
}

//get the search form
let searchFormElement = document.querySelector("#search-tab");
searchFormElement.addEventListener("submit", changeCity); //add eventlistner when submit is activated and call function
