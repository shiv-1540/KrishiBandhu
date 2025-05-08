import React, { useState } from "react";
import Weather, { getTodayWeather } from "./Weather";
import HorizontalNav from "../components/Farmer/Home/HorizontalNav";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCartShopping, 
  faCloud, 
  faAddressBook, 
  faWarehouse,
  faTint,
  faWind,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import logo_main from "../imgs/logo_main.png";
import farmerSuccess1 from "../imgs/farmer1.jpg";
import farmerSuccess2 from "../imgs/farmer2.jpg";
import farmerSuccess3 from "../imgs/farmer3.jpg";
import farmerSuccess4 from "../imgs/farmer4.jpg";

const StoryCard = ({ img, name, story }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img 
      src={img} 
      alt={name} 
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600">{story}</p>
    </div>
  </div>
);

const Home = () => { 
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const data = await getTodayWeather(latitude, longitude, "99598ffc512d465521c1d8667c56d4cf");
        setTodayWeather(data);
      },
      (err) => console.error("Location access denied.")
    );
  }, []);

  const features = [
    { 
      icon: faCloud, 
      title: "Weather Forecast", 
      desc: "Stay updated with real-time weather alerts and plan your crops accordingly.",
      bgColor: "from-blue-50 to-blue-100"
    },
    { 
      icon: faCartShopping, 
      title: "E-commerce Platform", 
      desc: "Buy and sell agricultural products easily with our dedicated farmer marketplace.",
      bgColor: "from-purple-50 to-purple-100"
    },
    { 
      icon: faAddressBook, 
      title: "Government Schemes", 
      desc: "Get access to all the latest government schemes and subsidies for farmers.",
      bgColor: "from-green-50 to-green-100"
    },
    { 
      icon: faWarehouse, 
      title: "Cold Storage Locator", 
      desc: "Find nearby cold storage facilities to store your produce safely and bugs free.",
      bgColor: "from-amber-50 to-amber-100"
    }
  ];

  const successStories = [
    { img: farmerSuccess1, name: "Ramesh Patel", story: "Using the weather forecast feature, Ramesh optimized his irrigation schedule and improved crop yield." },
    { img: farmerSuccess2, name: "Sitaram Kadam", story: "Sitaram connected with buyers directly through our marketplace, getting fair prices for her organic produce." },
    { img: farmerSuccess4, name: "Mohan Yadav", story: "Mohan availed government subsidies effortlessly, boosting his farm's efficiency." },
    { img: farmerSuccess3, name: "Radha Tiwari", story: "Radha utilized our plant diseases prediction to save her crops from infestation." }
  ];

  return (
    <div className="pb-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">🌾 कृषिबंधू - Empowering Farmers with Technology</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          A smart agriculture platform for farmers to make data-driven decisions and improve productivity.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            to="/news" 
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Latest News
          </Link>
          <Link 
            to="/weather" 
            className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Weather Forecast
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <HorizontalNav />

        {/* Today's Weather Summary */}
        {todayWeather && (
          <div className="bg-white rounded-xl shadow-md p-6 my-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${todayWeather.icon}@2x.png`}
                alt={todayWeather.weather}
                className="w-20 h-20"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {moment(todayWeather.date).format("dddd, MMMM D")}
                </h3>
                <p className="text-gray-600">{todayWeather.weather}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faTint} className="text-blue-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-bold">{todayWeather.avgHumidity}%</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faWind} className="text-green-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Wind</p>
                  <p className="font-bold">{todayWeather.avgWindSpeed} m/s</p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-amber-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="font-bold">{todayWeather.avgTemp}°C</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.bgColor} rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="text-4xl mb-4 text-green-600 flex justify-center">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center flex-grow">{feature.desc}</p>
                {hoveredIndex === index && (
                  <div className="mt-4 text-center">
                    <Link 
                      to={feature.title === "Weather Forecast" ? "/weather" : 
                          feature.title === "E-commerce Platform" ? "/ecommerce" :
                          feature.title === "Government Schemes" ? "/schemes" : "/cold-storages"}
                      className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-lg p-6 my-16 mb-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join the Future of Farming</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Leverage the power of technology to maximize your agricultural success.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;