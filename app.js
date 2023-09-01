// API key for OpenWeatherMap
const apikey = "46f80a02ecae410460d59960ded6e1c6";

// Get references to HTML elements
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

// Add a submit event listener to the form
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const cityValue = cityInputEl.value.trim(); // Get the trimmed city input value
  getWeatherData(cityValue); // Call the function to fetch weather data
});

// Function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      // Construct the API URL with the provided city and API key
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok"); // Handle non-ok response
    }

    const data = await response.json(); // Parse the JSON response

    // Extract weather information from the data
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;

    // Display weather information in the HTML elements
    weatherDataEl.querySelector(".city").innerHTML = `${cityName}`;
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    // Display additional weather details
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
    ];
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");

    // Clear the input field
    cityInputEl.value = "";
  } catch (error) {
    if (cityValue === "") {
      // Handle the case when no city is entered
      weatherDataEl.querySelector(".city").textContent = "";
      weatherDataEl.querySelector(".icon").innerHTML = "";
      weatherDataEl.querySelector(".temperature").textContent = "";
      weatherDataEl.querySelector(".details").innerHTML = "";
      cityInputEl.value = "";
      weatherDataEl.querySelector(".description").textContent =
        "Please enter a city name";
    } else {
      // Handle errors from the API request
      weatherDataEl.querySelector(".city").textContent = "";
      weatherDataEl.querySelector(".icon").innerHTML = "";
      weatherDataEl.querySelector(".temperature").textContent = "";
      weatherDataEl.querySelector(".description").textContent =
        "An error occurred, please try again later";
      weatherDataEl.querySelector(".details").innerHTML = "";
      cityInputEl.value = "";
    }
  }
}
