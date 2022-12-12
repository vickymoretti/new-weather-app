function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	let myTime = date.toLocaleTimeString([], {
		hours: "2-digit",
		minutes: "2-digit",
	});

	return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "t7208a38bb3e0eaafeo46762934523cb";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
	console.log(apiUrl);
	axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dayElement = document.querySelector("#day");
	let iconElement = document.querySelector("#icon");
	celsiusTemperature = response.data.temperature.current;
	temperatureElement.innerHTML = Math.round(response.data.temperature.current);
	cityElement.innerHTML = response.data.city;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = response.data.temperature.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dayElement.innerHTML = formatDate(response.data.time * 1000);
	iconElement.setAttribute(
		"src",
		`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
	);
	iconElement.setAttribute("alt", response.data.condition.description);

	getForecast(response.data.coordinates);
}

function search(city) {
	let apiKey = "t7208a38bb3e0eaafeo46762934523cb";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");
	let days = ["Thu", "Fri", "Sat"];
	let forecastHTML = `<div class="row">`;
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`<div class="col-2">
			<div class="weather-forecast-date">${day} </div>
								<img
									src="https://ssl.gstatic.com/onebox/weather/64/rain_light.png"
									alt="rainy"
									width="36"
								/>
								<div class="weather-forecast-temperature"> 12° | 18° </div>
							</div>`;
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("New York");
