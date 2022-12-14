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

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`<div class="col-2">
			<div class="weather-forecast-day">${formatDay(forecastDay.time)} </div>
								<img
									src="${forecastDay.condition.icon_url} "
									alt="rainy"
									width="36"
								/>
								<div class="weather-forecast-temperature"> ${Math.round(
									forecastDay.temperature.maximum
								)}?? | ${Math.round(forecastDay.temperature.minimum)}??</div>
							</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
