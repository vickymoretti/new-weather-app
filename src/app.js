let apiKey = "t7208a38bb3e0eaafeo46762934523cb";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={London}&key=${apiKey}&units=metric`;

function displayTemperature(response) {
	console.log(response.data.temperature.current);
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

axios.get(apiUrl).then(displayTemperature);
