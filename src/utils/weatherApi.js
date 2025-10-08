export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const processWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(data.main.temp);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

// Weather API → getWeatherType function → returns a weather type
// That weather type → gets passed to Main.jsx as weatherType prop
// Main.jsx → filters clothing items where item.weather === weatherType
//Think of your API as a weather reporter who provides you with the current weather conditions.
// Your job is to ask the reporter for the weather, process their response, and then use that information to decide what clothes to wear.

//Here’s the full flow of how your API integration works:

// Ask the Weather Reporter:
// The getWeather function sends a request to the API with your location and API key.

// Get the Weather Report:
// The API responds with detailed weather data.

// Process the Weather Report:
// The processWeatherData function extracts the city, temperature, and weather type from the API response.

// Decide What to Wear:
// The getWeatherType function categorizes the weather as hot, warm, or cold based on the temperature.

// Show the Right Clothes:
// The Main component filters clothing items based on the weather type and displays them to the user.
