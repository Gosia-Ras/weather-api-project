// Get references to HTML elements
const weatherContainer = document.getElementById("weather");
const select = document.getElementById("citySelect");
const fetchButton = document.getElementById("fetchWeatherButton");

// Variable to store city data
let cityData;

// Event listener for the fetch button click
fetchButton.addEventListener("click", fetchWeatherForSelectedCity);

// Function to fetch city data from JSON file
function fetchData() {
  return fetch("./city_coordinates.json")
    .then((response) => response.json())
    .then((data) => {
      // Store fetched city data
      cityData = data;
      // Populate the city selection dropdown
      populateSelect(cityData);
    });
}

// Function to populate the city selection dropdown
function populateSelect(cityData) {
  cityData.forEach((cityInfo) => {
    const option = document.createElement("option");
    option.value = cityInfo.city;
    option.textContent = cityInfo.city;
    select.appendChild(option);
  });
}

// Function to format date from YYYYMMDD to DD-MM-YYYY
function formatDate(yyyymmdd) {
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const day = yyyymmdd.substring(6, 8);
  return `${day}-${month}-${year}`;
}

// Function to fetch weather data for a specific city
function getWeather(longitude, latitude, city, country) {
  const url = `https://www.7timer.info/bin/civillight.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json&tzshift=0`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let html = `<h3>Weather for: ${city}, ${country} </h3>`;

      // Loop through weather data and build HTML content
      data.dataseries.forEach((item) => {
        const formattedDate = formatDate(item.date.toString());
        html += `
          <hr>
          <p>Date: ${formattedDate}</p>
          <p>Weather Type: ${item.weather}</p>
          <p>Maximum Temperature: ${item.temp2m.max}</p>
          <p>Minimum Temperature: ${item.temp2m.min}</p>
        `;
      });

      // Display weather information in the weather container
      weatherContainer.innerHTML = html;
    });
}

// Function to fetch and display weather data for the selected city
function fetchWeatherForSelectedCity() {
  const selectedCity = select.value;
  if (selectedCity) {
    const cityInfo = cityData.find((city) => city.city === selectedCity);
    if (cityInfo) {
      // Call the getWeather function with city details
      getWeather(
        cityInfo.longitude,
        cityInfo.latitude,
        cityInfo.city,
        cityInfo.country
      );
    }
  }
}

// Fetch city data
fetchData();
