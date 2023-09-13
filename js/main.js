const weatherContainer = document.getElementById("weather");

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function fetchData() {
  return fetch("./city_coordinates.json")
    .then((response) => response.json())
    .then((cityData) => {
      cityData.forEach((cityInfo) => {
        getWeather(
          cityInfo.longitude,
          cityInfo.latitude,
          cityInfo.city,
          cityInfo.country
        );
      });
    });
}

function getWeather(longitude, latitude, city, country) {
  const url = `https://www.7timer.info/bin/civillight.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json&tzshift=0`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let html = `<h3>Weather for: ${city}, ${country} </h3>`;

      data.dataseries.forEach((item) => {
        html += `
            <hr>
            <div>Weather Type: ${item.weather}</div>
            <div>Maximum Temperature: ${item.temp2m.max}</div>
            <div>Minimum Temperature: ${item.temp2m.min}</div>
          
        `;
      });
      weatherContainer.innerHTML += html;
    });
}

fetchData();
