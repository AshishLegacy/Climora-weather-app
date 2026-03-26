function updateDate() {
  let now = new Date();
  document.getElementById("date").innerText = now.toDateString();
}
updateDate();

async function getWeather() {
  let city = document.getElementById("input").value;

  let apiKey = "b7e0903cdd30449b849105458262403";

  let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

  try {
    let res = await fetch(url);
    let data = await res.json();

    // current
    document.getElementById("city").innerText = data.location.name;
    document.getElementById("temp").innerText = data.current.temp_c + "°";
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("icon").src = "https:" + data.current.condition.icon;

    // forecast
    let forecastHTML = "";

    data.forecast.forecastday.forEach(day => {
      forecastHTML += `
        <div class="forecast-item">
          <p>${day.date.split("-")[2]}</p>
          <img src="https:${day.day.condition.icon}" width="40">
          <p>${day.day.avgtemp_c}°</p>
        </div>
      `;
    });

    document.getElementById("forecast").innerHTML = forecastHTML;

  } catch (err) {
    alert("Error fetching weather");
  }
}