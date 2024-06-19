const apiKey = "0dfe6d9b88c043262550dd2fb67c5663";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function getCityWeathers(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block" // can see
        document.querySelector(".weather").style.display = "none" // can't see
    } else {
        var cityWeathers = await response.json()

        document.querySelector(".city").innerHTML = cityWeathers.name;
        document.querySelector(".temp").innerHTML = Math.round(cityWeathers.main.temp) + " °c";
        document.querySelector(".humidity").innerHTML = cityWeathers.main.humidity + " %";
        document.querySelector(".wind").innerHTML = cityWeathers.wind.speed + " km/h";

        if (cityWeathers.weather[0].main == "Clouds") {
            weatherIcon.src = "./img/clouds.png"
        } else if (cityWeathers.weather[0].main == "Clear") {
            weatherIcon.src = "./img/clear.png"
        } else if (cityWeathers.weather[0].main == "Rain") {
            weatherIcon.src = "./img/rain.png"
        } else if (cityWeathers.weather[0].main == "Drizzle") {
            weatherIcon.src = "./img/drizzle.png"
        } else if (cityWeathers.weather[0].main == "Mist") {
            weatherIcon.src = "./img/mist.png"
        } else if (cityWeathers.weather[0].main == "Snow") {
            weatherIcon.src = "./img/snow.png"
        }

        document.querySelector(".weather").style.display = "block" // can see
    }
}

searchBtn.addEventListener('click', function () {
    getCityWeathers(searchBox.value)
})



