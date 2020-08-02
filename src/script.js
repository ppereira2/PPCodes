const formatDate = (timestamp) => {
  let date = new Date(timestamp);

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
  let currentDate = `${currentWeekday}, ${currentDay} ${currentMonth}`;

  return currentDate;

};

const formatHours = (timestamp) => {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentHour = `${hours}:${minutes}`;

  return currentHour;
}

const celsiusToF = () => {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let farenheitTemp = Math.round((currentCelsiusTemp * 9) / 5 + 32);
  document.querySelector(".temperature-number").innerHTML = farenheitTemp;
};

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", celsiusToF);


const fahrenheitToC = () => {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector(".temperature-number").innerHTML = currentCelsiusTemp;
};

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", fahrenheitToC);


const displayWeatherCondition = response => {
  document.querySelector(".city").innerHTML = response.data.name;
  let citySearched = document.querySelector(".form-control");
  citySearched.value = "";
  currentCelsiusTemp = Math.round(response.data.main.temp);
  document.querySelector(".temperature-number").innerHTML = Math.round(currentCelsiusTemp);
  let insertDate = document.querySelector(".date");
  insertDate.innerHTML = formatDate(response.data.dt * 1000) + ' ' + formatHours(response.data.dt * 1000);
  let currentDayElement = document.querySelector('.day-icon');
  let iconDay = getIconFromWeather(response.data.weather[0].icon);
  currentDayElement.setAttribute("src", `images/weather_icons_dovora_interactive/PNG/512/${iconDay}`);
  currentDayElement.setAttribute("alt", response.data.weather[0].description);
}

const displayForecast = response => {
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let i = 0; i < 5; i++) {
    forecast = response.data.list[i];
    console.log(forecast)
    let forecastTempMin = Math.round(forecast.main.temp_min);
    let forecastTempMax = Math.round(forecast.main.temp_max);
    let iconHtml = getIconFromWeather(forecast.weather[0].icon);
    forecastElement.innerHTML += `
    <div class="col" >
      <h5 id="day-0">${formatHours(forecast.dt * 1000)}</h5>
      <img class="weekdays-icon" src="images/weather_icons_dovora_interactive/PNG/512/${iconHtml}">
      <h5 id="day-temp-0">${forecastTempMin}º / ${forecastTempMax}º</h5>
            </div >
            `;
  }
}

const getIconFromWeather = forecastWeatherMain => {
  if (forecastWeatherMain == '01d') {
    return 'day_clear.png'
  } else if (forecastWeatherMain == '01n') {
    return 'night_half_moon_clear.png'
  } else if (forecastWeatherMain == '02n') {
    return 'night_half_moon_partial_cloud.png'
  } else if (forecastWeatherMain == '02d') {
    return 'day_partial_cloud.png'
  } else if (forecastWeatherMain == '03d' || forecastWeatherMain == '03n' || forecastWeatherMain == '04d' || forecastWeatherMain == '04n') {
    return 'cloudy.png'
  } else if (forecastWeatherMain == '09d' || forecastWeatherMain == '09n' || forecastWeatherMain == '10d' || forecastWeatherMain == '10n') {
    return 'rain.png'
  } else if (forecastWeatherMain == '11d' || forecastWeatherMain == '11n') {
    return 'thunder.png'
  } else if (forecastWeatherMain == '13d' || forecastWeatherMain == '13n') {
    return 'snow.png'
  } else if (forecastWeatherMain == '50d' || forecastWeatherMain == '50n') {
    return 'mist.png'
  }
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

const doSearch = event => {
  event.preventDefault();
  let citySearched = document.querySelector(".form-control").value;
  doMetric(citySearched);
}

let currentCelsiusTemp = null;

let searchForm = document.querySelector(".form-inline");
searchForm.addEventListener("submit", doSearch);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);

doMetric("Lisbon");