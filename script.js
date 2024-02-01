import axios from "axios";

axios
  .get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.4814&longitude=-1.8998&current=apparent_temperature,is_day,rain,showers,snowfall&hourly=temperature_2m,rain,showers,snowfall&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timeformat=unixtime&timezone=Europe%2FLondon&past_days=14&forecast_days=14"
  )
  .then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
