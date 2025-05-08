import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTint,
  faWind,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

// Weather icon paths (from public folder)
const weatherIcons = {
  sunny: "/weather-icons/sunny.png",
  cloudy: "/weather-icons/cloudy.png",
  rainy: "/weather-icons/rainy.png",
  thunder: "/weather-icons/thunder.png",
  snowy: "/weather-icons/snowy.png",
  partlyCloudy: "/weather-icons/partly-cloudy.png",
  mist: "/weather-icons/mist.png",
  default: "/weather-icons/default.png"
};

const processForecast = (list) => {
  const dailyData = {};

  list.forEach((item) => {
    const date = moment(item.dt_txt).format("YYYY-MM-DD");
    const hour = moment(item.dt_txt).format("h A");

    if (!dailyData[date]) {
      dailyData[date] = {
        temp: [],
        humidity: [],
        windSpeed: [],
        weather: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        hours: [],
        dateReadable: moment(item.dt_txt).format("ddd, MMM D"),
      };
    }

    dailyData[date].temp.push(item.main.temp);
    dailyData[date].humidity.push(item.main.humidity);
    dailyData[date].windSpeed.push(item.wind.speed);
    dailyData[date].hours.push({
      ...item,
      time: hour,
      weatherImage: getWeatherImage(item.weather[0].main)
    });
  });

  return Object.keys(dailyData).slice(0, 5).map((date) => ({
    date,
    dateReadable: dailyData[date].dateReadable,
    avgTemp: (dailyData[date].temp.reduce((a, b) => a + b, 0) / dailyData[date].temp.length).toFixed(1),
    minTemp: Math.min(...dailyData[date].temp).toFixed(1),
    maxTemp: Math.max(...dailyData[date].temp).toFixed(1),
    avgHumidity: (dailyData[date].humidity.reduce((a, b) => a + b, 0) / dailyData[date].humidity.length).toFixed(1),
    avgWindSpeed: (dailyData[date].windSpeed.reduce((a, b) => a + b, 0) / dailyData[date].windSpeed.length).toFixed(1),
    weather: dailyData[date].weather,
    description: dailyData[date].description,
    icon: dailyData[date].icon,
    hours: dailyData[date].hours,
    weatherImage: getWeatherImage(dailyData[date].weather)
  }));
};

const getWeatherImage = (weatherCondition) => {
  const condition = weatherCondition.toLowerCase();
  if (condition.includes("clear")) return weatherIcons.sunny;
  if (condition.includes("rain")) return weatherIcons.rainy;
  if (condition.includes("snow")) return weatherIcons.snowy;
  if (condition.includes("thunder")) return weatherIcons.thunder;
  if (condition.includes("cloud")) return weatherIcons.cloudy;
  if (condition.includes("mist") || condition.includes("fog")) return weatherIcons.mist;
  return weatherIcons.default;
};

const getFarmingTip = (weatherCondition) => {
  const condition = weatherCondition.toLowerCase();
  if (condition.includes("rain")) {
    return "Ideal conditions for planting. Avoid applying fertilizers or pesticides as rain may wash them away. Good time for rice transplantation.";
  }
  if (condition.includes("clear")) {
    return "Perfect weather for harvesting and drying crops. Irrigate fields in the early morning or late evening to reduce water loss through evaporation.";
  }
  if (condition.includes("cloud")) {
    return "Good day for most farming activities. Moderate temperatures reduce stress on crops and livestock.";
  }
  if (condition.includes("thunder")) {
    return "Postpone field work due to lightning risk. Secure farm equipment and protect sensitive crops. Check drainage systems.";
  }
  if (condition.includes("snow")) {
    return "Protect winter crops with covers. Store harvested produce properly. Avoid working in fields during extreme cold.";
  }
  if (condition.includes("mist") || condition.includes("fog")) {
    return "High humidity increases disease risk. Monitor crops for fungal infections. Delay spraying until visibility improves.";
  }
  return "Monitor weather regularly to plan farming activities. Check soil moisture before irrigation.";
};

const Weather = () => {
  const [forecast, setForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "99598ffc512d465521c1d8667c56d4cf";
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        setError("Please enable location services to get weather updates.");
        setLoading(false);
      }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const dailyForecast = processForecast(response.data.list);
      setForecast(dailyForecast);
      if (dailyForecast.length > 0) {
        setSelectedDay(dailyForecast[0].date);
        setHourlyData(dailyForecast[0].hours);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day.date);
    setHourlyData(day.hours);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="text-gray-600">Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Farm Weather Forecast</h1>
        <p className="text-gray-600">Plan your farming activities with accurate weather predictions</p>
      </div>

      {/* 5-Day Forecast */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {forecast.map((day, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg p-4 text-center cursor-pointer transition-all duration-200 border-2 ${
              selectedDay === day.date 
                ? "border-green-500 shadow-lg transform -translate-y-1 bg-green-50" 
                : "border-gray-100 hover:border-green-300"
            }`}
            onClick={() => handleDayClick(day)}
          >
            <h3 className="font-medium text-gray-800">{day.dateReadable}</h3>
            <div className="h-16 my-3 flex items-center justify-center">
              <img 
                src={day.weatherImage} 
                alt={day.description} 
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex justify-center items-baseline space-x-1">
              <span className="text-xl font-bold text-red-500">{day.maxTemp}°</span>
              <span className="text-sm text-blue-500">/{day.minTemp}°</span>
            </div>
            <div className="flex justify-between mt-3 text-xs text-gray-600">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTint} className="text-green-600 mr-1" />
                <span>{day.avgHumidity}%</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faWind} className="text-green-600 mr-1" />
                <span>{day.avgWindSpeed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Forecast */}
      {selectedDay && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Hourly Forecast</h2>
            <p className="text-gray-500">
              {moment(selectedDay).format("dddd, MMMM D")}
            </p>
          </div>
          <div className="flex overflow-x-auto pb-2 -mx-2 scrollbar-hide">
            {hourlyData.map((hour, index) => (
              <div key={index} className="flex-shrink-0 px-2">
                <div className="bg-gray-50 rounded-lg p-3 w-24 text-center">
                  <p className="font-medium text-gray-700">{hour.time}</p>
                  <div className="h-12 my-2 flex items-center justify-center">
                    <img 
                      src={hour.weatherImage} 
                      alt={hour.weather[0].description} 
                      className="h-full w-auto"
                    />
                  </div>
                  <p className="text-lg font-bold text-gray-800">{hour.main.temp}°</p>
                  <div className="flex flex-col space-y-1 mt-2 text-xs text-gray-600">
                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon icon={faTint} className="text-green-500 mr-1" size="xs" />
                      <span>{hour.main.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon icon={faWind} className="text-green-500 mr-1" size="xs" />
                      <span>{hour.wind.speed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farming Tips */}
      <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
        <h3 className="flex items-center text-lg font-semibold text-green-800 mb-3">
          <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-green-600" />
          Farming Advisory
        </h3>
        <p className="text-gray-700">
          {getFarmingTip(forecast.length > 0 ? forecast[0].weather : '')}
        </p>
      </div>
    </div>
  );
};

export const getTodayWeather = async (lat, lon, apiKey) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const dailyForecast = processForecast(response.data.list);
    if (dailyForecast.length > 0) {
      return {
        date: dailyForecast[0].date,
        avgTemp: dailyForecast[0].avgTemp,
        avgHumidity: dailyForecast[0].avgHumidity,
        avgWindSpeed: dailyForecast[0].avgWindSpeed,
        weather: dailyForecast[0].weather,
        description: dailyForecast[0].description,
        icon: dailyForecast[0].icon
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    return null;
  }
};

export default Weather;