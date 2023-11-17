document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "bd47324fc33141c988a175621231611";
  const cityInput = document.getElementById("city");
  const loader = document.getElementById("loader");
  const textContainer = document.querySelector(".text");
  const weatherContainer = document.querySelector(".weather");
  const errorContainer = document.getElementById("error-container");

  cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const city = cityInput.value;
      cityInput.setAttribute("disabled", true);

      if (city) {
        getWeatherData(city);
      } else {
        showError("Please enter a city name.");
      }
    }
  });

  async function getWeatherData(city) {
    showLoader();
    try {
      const response = await fetch(
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apiKey}&q=${city}&num_of_days=5&format=json&includelocation=yes`
      );
      const data = await response.json();

      console.log("Weather Data:", data);

      displayWeatherInfo(data);
      cityInput.removeAttribute("disabled");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      showError("No matching location found");
      cityInput.removeAttribute("disabled");
    } finally {
      hideLoader();
    }
  }

  function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById("weather-info");
    weatherInfoContainer.innerHTML = `
    <div class=bblock>
    <div>
        <p class="weather-city">${data.data.request[0].query}</p>
        <p class="weather-data">${data.data.weather[0].date}</p>
        <p>${new Date().toLocaleTimeString()}</p></div>
        <div class="degree">
          <img class="icon" src="https://cdn-icons-png.flaticon.com/128/1163/1163661.png" alt="Weather Icon" />
          <p class="degree-c">${data.data.current_condition[0].temp_C} °C</p>
          <p class="sunny">${
            data.data.current_condition[0].weatherDesc[0].value
          }</p>
        </div>
        <div>
          <p>feels like: ${data.data.current_condition[0].FeelsLikeC}°C</p>
          <p>Humidity: ${data.data.current_condition[0].humidity}%</p>
          <p>Wind: ${data.data.current_condition[0].windspeedKmph} kph</p>
        </div></div>
      `;

    hideError();
    showWeather();
  }

  function showLoader() {
    loader.style.display = "block";
    textContainer.style.display = "none";
    weatherContainer.style.display = "none";
    errorContainer.style.display = "none";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  function showError(message) {
    errorContainer.innerHTML = `<p class="err-p">${message}</p>`;
    errorContainer.style.display = "block";
    textContainer.style.display = "none";
    weatherContainer.style.display = "none";
  }

  function hideError() {
    errorContainer.style.display = "none";
  }

  function showWeather() {
    textContainer.style.display = "none";
    weatherContainer.style.display = "block";
  }
});
