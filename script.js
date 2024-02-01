import axios from "axios";

axios
  .get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.4814&longitude=-1.8998&current=temperature_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&timeformat=unixtime&timezone=Europe%2FLondon&past_days=14&forecast_days=14"
  )
  .then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
