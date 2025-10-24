import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions?.filter((option) => {
    return (
      option.day === (weatherData?.isDay ? "true" : "false") &&
      option.condition === weatherData?.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData?.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData?.temp[CurrentTemperatureUnit]}°{CurrentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={` Card Showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
