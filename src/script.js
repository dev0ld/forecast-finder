//function that handels change of city
function changeCity(event) {
  event.preventDefault(); //the page does not reload automaticly
  let searchInput = document.querySelector("#search-area"); //get the search input from user

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;
}

//get the search form
let searchFormElement = document.querySelector("#search-tab");
searchFormElement.addEventListener("submit", changeCity); //add eventlistner when submit is activated and call function
