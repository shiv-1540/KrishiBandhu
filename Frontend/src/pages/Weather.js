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

// Move processForecast outside the component
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

// Also move getWeatherImage outside since processForecast uses it
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
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Farm Weather Forecast</h1>
        <p style={styles.subtitle}>Plan your farming activities with accurate weather predictions</p>
      </div>

      <div style={styles.forecastContainer}>
        {forecast.map((day, index) => (
          <div
            key={index}
            style={{
              ...styles.dayCard,
              ...(selectedDay === day.date ? styles.selectedDayCard : {}),
            }}
            onClick={() => handleDayClick(day)}
          >
            <h3 style={styles.dayTitle}>{day.dateReadable}</h3>
            <div style={styles.weatherImageContainer}>
              <img 
                src={day.weatherImage} 
                alt={day.description} 
                style={styles.weatherImage}
              />
            </div>
            <div style={styles.tempContainer}>
              <span style={styles.maxTemp}>{day.maxTemp}°</span>
              <span style={styles.minTemp}>/{day.minTemp}°</span>
            </div>
            <div style={styles.weatherDetails}>
              <div style={styles.detailItem}>
                <FontAwesomeIcon icon={faTint} style={styles.detailIcon} />
                <span>{day.avgHumidity}%</span>
              </div>
              <div style={styles.detailItem}>
                <FontAwesomeIcon icon={faWind} style={styles.detailIcon} />
                <span>{day.avgWindSpeed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDay && (
        <div style={styles.hourlyContainer}>
          <div style={styles.hourlyHeader}>
            <h2 style={styles.hourlyTitle}>Hourly Forecast</h2>
            <p style={styles.selectedDate}>{moment(selectedDay).format("dddd, MMMM D")}</p>
          </div>
          <div style={styles.hourlyForecast}>
            {hourlyData.map((hour, index) => (
              <div key={index} style={styles.hourCard}>
                <p style={styles.hourTime}>{hour.time}</p>
                <div style={styles.hourWeatherImage}>
                  <img 
                    src={hour.weatherImage} 
                    alt={hour.weather[0].description} 
                    style={styles.weatherIcon}
                  />
                </div>
                <p style={styles.hourTemp}>{hour.main.temp}°</p>
                <div style={styles.hourDetails}>
                  <div style={styles.hourDetailItem}>
                    <FontAwesomeIcon icon={faTint} size="xs" style={styles.hourDetailIcon} />
                    <span>{hour.main.humidity}%</span>
                  </div>
                  <div style={styles.hourDetailItem}>
                    <FontAwesomeIcon icon={faWind} size="xs" style={styles.hourDetailIcon} />
                    <span>{hour.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.farmingTips}>
        <h3 style={styles.tipsTitle}>
          <FontAwesomeIcon icon={faArrowRight} style={styles.tipIcon} />
          Farming Advisory
        </h3>
        <p style={styles.tipText}>
          {getFarmingTip(forecast.length > 0 ? forecast[0].weather : '')}
        </p>
      </div>
    </div>
  );
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

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    color: "#2E8B57",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#666",
    fontSize: "16px",
    marginTop: "0",
  },
  forecastContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "30px",
  },
  dayCard: {
    flex: "1",
    minWidth: "150px",
    background: "#ffffff",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e0e0",
  },
  selectedDayCard: {
    background: "#e8f5e9",
    border: "1px solid #2E8B57",
    boxShadow: "0 4px 8px rgba(46, 139, 87, 0.2)",
    transform: "translateY(-5px)",
  },
  dayTitle: {
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 10px 0",
  },
  weatherImageContainer: {
    height: "60px",
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherImage: {
    height: "100%",
    width: "auto",
    objectFit: "contain",
  },
  tempContainer: {
    margin: "10px 0",
  },
  maxTemp: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#e53935",
  },
  minTemp: {
    fontSize: "16px",
    color: "#1e88e5",
  },
  weatherDetails: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: "#666",
  },
  detailIcon: {
    color: "#2E8B57",
    fontSize: "14px",
  },
  hourlyContainer: {
    background: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e0e0",
  },
  hourlyHeader: {
    marginBottom: "15px",
    textAlign: "center",
  },
  hourlyTitle: {
    color: "#333",
    fontSize: "18px",
    fontWeight: "500",
    margin: "0",
  },
  selectedDate: {
    color: "#666",
    fontSize: "14px",
    margin: "5px 0 0 0",
  },
  hourlyForecast: {
    display: "flex",
    overflowX: "auto",
    gap: "15px",
    paddingBottom: "10px",
  },
  hourCard: {
    minWidth: "80px",
    background: "#f5f5f5",
    borderRadius: "6px",
    padding: "10px",
    textAlign: "center",
  },
  hourTime: {
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 0 5px 0",
  },
  hourWeatherImage: {
    height: "40px",
    margin: "5px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIcon: {
    height: "100%",
    width: "auto",
  },
  hourTemp: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "5px 0",
    color: "#333",
  },
  hourDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  hourDetailItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    fontSize: "11px",
    color: "#666",
  },
  hourDetailIcon: {
    color: "#2E8B57",
  },
  farmingTips: {
    background: "#e8f5e9",
    borderRadius: "8px",
    padding: "15px",
    borderLeft: "4px solid #2E8B57",
  },
  tipsTitle: {
    color: "#2E8B57",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "0",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tipIcon: {
    fontSize: "14px",
  },
  tipText: {
    color: "#333",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
  },
  loadingSpinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #2E8B57",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "15px",
  },
  errorContainer: {
    background: "#ffebee",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  errorText: {
    color: "#c62828",
    margin: "0",
  },
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