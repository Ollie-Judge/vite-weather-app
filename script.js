import axios from "axios";

const latLong = document.getElementById("latLong");
const location = document.getElementById("location");
const feelsLikeTemp = document.getElementById("feelsLikeTemp");
const actualTemp = document.getElementById("actualTemp");
const time = document.getElementById("time");

axios
  .get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.4814&longitude=-1.8998&current=temperature_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&timeformat=unixtime&timezone=Europe%2FLondon&past_days=14&forecast_days=14"
  )
  .then(
    (response) => {
      console.log(response.data);

      latLong.innerText = `Lat: ${response.data.latitude}, Long: ${response.data.longitude}`;
      location.innerText = `${response.data.timezone}`;
      time.innerText = new Date(response.data.current.time * 1000); //convert to an actual time

      feelsLikeTemp.innerText = `Feels like: ${response.data.current.apparent_temperature} °C`;
      actualTemp.innerText = `Actual Temperature: ${response.data.current.temperature_2m} °C`;
      console.log(response.data.current.temperature_2m);
    },
    (error) => {
      console.log(error);
    }
  );
