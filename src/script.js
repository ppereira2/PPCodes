const formatDate = () => {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let currentMonth = months[date.getMonth()];
  let currentDay = date.getDate();
  let currentWeekday = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${currentWeekday}, ${currentDay} ${currentMonth} ${hours}:${minutes}`;

  return currentDate;
};

let insertDate = document.querySelector(".date");
insertDate.innerHTML = formatDate();

const celsiusToF = () => {
  event.preventDefault();
  let currentCelsiusTemp = document.querySelector(".temperature-number").innerHTML;
  let farenheitTemp = Math.round((currentCelsiusTemp * 9) / 5 + 32);
  document.querySelector(".temperature-number").innerHTML = farenheitTemp;
};

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", celsiusToF);


const fahrenheitToC = () => {
  event.preventDefault();
  let currentFarTemp = document.querySelector(".temperature-number").innerHTML;
  let celsiusTemp = Math.round((5 / 9) * (currentFarTemp - 32));
  document.querySelector(".temperature-number").innerHTML = celsiusTemp;
};

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", fahrenheitToC);



//completar
const displayWeatherCondition = response => {
  document.querySelector(".city").innerHTML = response.data.name;
  let citySearched = document.querySelector(".form-control");
  citySearched.value = "";
  let temperatureCelsius = Math.round(response.data.main.temp);
  document.querySelector(".temperature-number").innerHTML = temperatureCelsius;
}

const searchLocation = position => {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

const getLocation = event => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

const doMetric = citySearched => {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

const doSearch = event => {
  event.preventDefault();
  let citySearched = document.querySelector(".form-control").value;
  doMetric(citySearched);
}

let searchForm = document.querySelector(".form-inline");
searchForm.addEventListener("submit", doSearch);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);

doMetric("Lisbon");