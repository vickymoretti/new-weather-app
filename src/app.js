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

function displayTemperature(response) {
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dayElement = document.querySelector("#day");
	let iconElement = document.querySelector("#icon");
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
	let fahrenheitTemperature = (14 * 9) / 5 + 32;
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
