import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import React from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, cardClick, clothingItems }) {
  const temperatureUnit = React.useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {temperatureUnit === "F"
            ? `${weatherData.temp.F}°F`
            : `${weatherData.temp.C}°C`}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard key={item._id} item={item} cardClick={cardClick} />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
