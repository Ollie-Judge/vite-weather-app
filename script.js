import axios from "axios";

const dailyWeatherContainer = document.getElementById("dailyWeatherContainer");
const weatherIcon = document.getElementById("weatherIcon");
const latLong = document.getElementById("latLong");
const location = document.getElementById("location");
const feelsLikeTemp = document.getElementById("feelsLikeTemp");
const actualTemp = document.getElementById("actualTemp");
const time = document.getElementById("time");
const hourlyWeatherTempContainer = document.getElementById(
  "hourlyWeatherTempContainer"
);

axios
  .get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.4814&longitude=-1.8998&current=temperature_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&timeformat=unixtime&timezone=Europe%2FLondon&past_days=14&forecast_days=14"
  )
  .then(
    (response) => {
      console.log(response.data);

      if (response.data.current.weather_code === 1) {
        weatherIcon.className = "fa-solid fa-sun";
      } else if (
        response.data.current.weather_code >= 2 &&
        response.data.current.weather_code <= 6
      ) {
        weatherIcon.className = "fa-solid fa-cloud-sun";
      } else if (
        response.data.current.weather_code >= 7 &&
        response.data.current.weather_code <= 11
      ) {
        weatherIcon.className = "fa-solid fa-cloud";
      } else if (
        response.data.current.weather_code >= 12 &&
        response.data.current.weather_code <= 18
      ) {
        weatherIcon.className = "fa-solid fa-cloud-rain";
      } else if (
        response.data.current.weather_code >= 19 &&
        response.data.current.weather_code <= 29
      ) {
        weatherIcon.className = "fa-solid fa-snowflake";
      } else {
        weatherIcon.className = "";
      }

      latLong.innerText = `Lat: ${response.data.latitude}, Long: ${response.data.longitude}`;
      location.innerText = `${response.data.timezone}`;
      time.innerText = new Date(response.data.current.time * 1000); //convert to an actual time

      feelsLikeTemp.innerText = `Feels like: ${response.data.current.apparent_temperature} °C`;
      actualTemp.innerText = `Actual Temperature: ${response.data.current.temperature_2m} °C`;

      console.log(response.data.daily);
      // take each array and loop through each set of items
      for (let i = 0; i < 28; i++) {
        const dailyWeatherItemContainer = document.createElement("div");
        dailyWeatherItemContainer.id = `dailyWeatherItemContainer${i}`;
        dailyWeatherItemContainer.className = "dailyWeatherItemContainer";

        const weatherIcon = document.createElement("i");
        weatherIcon.id = `weatherIcon${i}`;
        if (response.data.daily.weather_code[i] === 1) {
          weatherIcon.className = "fa-solid fa-sun";
        } else if (
          response.data.daily.weather_code[i] >= 2 &&
          response.data.daily.weather_code[i] <= 6
        ) {
          weatherIcon.className = "fa-solid fa-cloud-sun";
        } else if (
          response.data.daily.weather_code[i] >= 7 &&
          response.data.daily.weather_code[i] <= 11
        ) {
          weatherIcon.className = "fa-solid fa-cloud";
        } else if (
          response.data.daily.weather_code[i] >= 12 &&
          response.data.daily.weather_code[i] <= 18
        ) {
          weatherIcon.className = "fa-solid fa-cloud-rain";
        } else if (
          response.data.daily.weather_code[i] >= 19 &&
          response.data.daily.weather_code[i] <= 29
        ) {
          weatherIcon.className = "fa-solid fa-snowflake";
        } else {
          weatherIcon.className = "fa-solid fa-cloud";
        }
        dailyWeatherItemContainer.appendChild(weatherIcon);

        const dailyTime = document.createElement("p");
        dailyTime.innerText = new Date(response.data.daily.time[i] * 1000);
        dailyWeatherItemContainer.appendChild(dailyTime);

        // const sunrise = document.createElement("p");
        // const timestamp = response.data.daily.sunrise[i] * 1000;
        // let hours = timestamp.getHours();
        // console.log(hours);
        // sunrise.innerText = `Sunrise: ${new Date(timestamp).toTimeString()}`;
        // dailyWeatherItemContainer.appendChild(sunrise);

        const apTempMax = document.createElement("p");
        apTempMax.innerText = `Feels like Max Temp: ${response.data.daily.apparent_temperature_max[i]}`;
        dailyWeatherItemContainer.appendChild(apTempMax);

        const apTempMin = document.createElement("p");
        apTempMin.innerText = `Feels like Min Temp: ${response.data.daily.apparent_temperature_min[i]}`;
        dailyWeatherItemContainer.appendChild(apTempMin);

        dailyWeatherContainer.appendChild(dailyWeatherItemContainer);
      }
    },
    (error) => {
      console.log(error);
    }
  );

//iconnumber: 1-sunny, 2-6 - sun but clouds, 7-11 clouds, 12-18 rain, 19-29 snow
