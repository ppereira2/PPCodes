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

const doSearch = (event) => {
  event.preventDefault;
  let city = document.querySelector(".form-control");
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = city.value;
  doMetric(city.value)
};

let search = document.querySelector(".input-group");
search.addEventListener("change", doSearch);


const doMetric = citySearched => {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(getTemperatureCelsius);

}

const getTemperatureCelsius = response => {
  let tempCel = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = tempCel;
  temperatureAndType.temperature = tempCel;
  temperatureAndType.type = "Celsius";
}

let temperatureAndType = {
  temperature: 26,
  type: "Celsius",
};
let currentTemperature = document.querySelector(".temperature-number");
currentTemperature.innerHTML = temperatureAndType.temperature;


const celsiusToF = () => {
  if (temperatureAndType.type === "Celsius") {
    let far = Math.round((temperatureAndType.temperature * 9) / 5 + 32);
    currentTemperature.innerHTML = far;
    temperatureAndType.temperature = far;
    temperatureAndType.type = "Farenheit";
  }
};

const fahrenheitToC = () => {
  if (temperatureAndType.type === "Farenheit") {
    let cel = Math.round((5 / 9) * (temperatureAndType.temperature - 32));
    currentTemperature.innerHTML = cel;
    temperatureAndType.temperature = cel;
    temperatureAndType.type = "Celsius";
  }
};

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

celsius.addEventListener("click", fahrenheitToC);
fahrenheit.addEventListener("click", celsiusToF);