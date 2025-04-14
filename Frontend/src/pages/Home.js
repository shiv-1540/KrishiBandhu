
import React, { useState } from "react";
import Weather, { getTodayWeather } from "./Weather";
import HorizontalNav from "../components/HorizontalNav";


import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { fontSize, height } from "@mui/system";
import logo_main from "../imgs/logo_main.png";
import farmerSuccess1 from "../imgs/farmer1.jpg";
import farmerSuccess2 from "../imgs/farmer2.jpg";
import farmerSuccess3 from "../imgs/farmer3.jpg";
import farmerSuccess4 from "../imgs/farmer4.jpg";
const StoryCard = ({ img, name, story }) => (
  <div style={styles.storyCard}>
    <img src={img} alt={name} style={styles.storyImage} />
    <h3>{name}</h3>
    <p>{story}</p>
  </div>
);


const Home = () => { 
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [hover, setHover] = useState(false);
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
  return (
    
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heading}>🌾 कृषिबंधू - Empowering Farmers with Technology</h1>
        <p style={styles.subheading}>
          A smart agriculture platform for farmers to make data-driven decisions and improve productivity.
        </p>
        
      </div>
      <div>
      <HorizontalNav />
      </div>
{/* Today's Weather Summary */}
{todayWeather && (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px 20px",
    background: "#2f9d607a",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "20px",
    marginLeft:"10%",
    marginRight:"10%",
    marginBottom: "30px",
    
    
    justifyContent: "center"
  }}>
    <img
      src={`https://openweathermap.org/img/wn/${todayWeather.icon}.png`}
      alt={todayWeather.weather}
      style={{ width: "60px", height: "60px" }}
    />
    <div>
      <h3 style={{ margin: 0 }}>{moment(todayWeather.date).format("dddd, MMM D")}</h3>
      <p style={{ margin: 0 }}>🌡 {todayWeather.avgTemp}°C</p>
      <p style={{ margin: 0 }}>💧 {todayWeather.avgHumidity}% | 💨 {todayWeather.avgWindSpeed} m/s</p>
      <p style={{ margin: 0 }}>{todayWeather.weather}</p>
    </div>
  </div>
)}
      {/* Features Section */}
      <div style={styles.features}>
  <h2 style={styles.sectionTitle}>Key Features</h2>
  <div style={styles.featureScroll}>
    {[
      { icon: faCloud, title: "Weather Forecast", desc: ["Stay updated with real-time weather alerts and plan your crops accordingly."] },
      { icon: faCartShopping, title: "E-commerce for Farmers", desc: ["Buy and sell agricultural products easily with a dedicated farmer marketplace."] },
      { icon: faAddressBook, title: "Government Schemes", desc: ["Get access to all the latest government schemes and subsidies for farmers."] },
      { icon: faWarehouse, title: "Locate Cold Storages", desc: ["Find nearby cold storage facilities to store your produce safely and bugs free."] }
    ].map((feature, index) => (
      <div
        key={index}
        style={hoveredIndex === index ? { ...styles.featureCard, ...styles.featureCardHover } : styles.featureCard}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div style={styles.featureCardIcon}>
          <FontAwesomeIcon icon={feature.icon} />
        </div>
        <b><h3>{feature.title}</h3></b>
        {feature.desc.map((line, i) => <p key={i}>{line}</p>)}
      </div>
    ))}
  </div>
</div>


      {/* Success Stories & Testimonials Section */}
      <div style={styles.successStories}>
        <h2 style={styles.sectionTitle}>Success Stories of Our Farmers</h2>
        <div style={styles.storyGrid}>
          <StoryCard img={farmerSuccess1} name="Ramesh Patel" story="Using the weather forecast feature, Ramesh optimized his irrigation schedule and improved crop yield." />
          <StoryCard img={farmerSuccess2} name="Sitaram Kadam" story="Sitaram connected with buyers directly through our marketplace, getting fair prices for her organic produce." />
          <StoryCard img={farmerSuccess4} name="Mohan Yadav" story="Mohan availed government subsidies effortlessly, boosting his farm’s efficiency." />
          <StoryCard img={farmerSuccess3} name="Radha Tiwari" story="Radha utilized our plant diseases prediction to save her crops from infestation." />
          
           </div>
           <br></br>
           
           <div style={styles.storyGrid}>
          <StoryCard img={farmerSuccess1} name="Ramesh Patel" story="Using the weather forecast feature, Ramesh optimized his irrigation schedule and improved crop yield." />
          <StoryCard img={farmerSuccess2} name="Sitaram Kadam" story="Sitaram connected with buyers directly through our marketplace, getting fair prices for her organic produce." />
          <StoryCard img={farmerSuccess4} name="Mohan Yadav" story="Mohan availed government subsidies effortlessly, boosting his farm’s efficiency." />
          <StoryCard img={farmerSuccess3} name="Radha Tiwari" story="Radha utilized our plant diseases prediction to save her crops from infestation." />
          
           </div>
           
      </div>

      {/* Call to Action Section */}
      <div style={styles.ctaSection}>
        <h2>Join the Future of Farming</h2>
        <p>Leverage the power of technology to maximize your agricultural success.</p>
        <Link to="/news" style={styles.ctaButton}>📢 Explore Latest News</Link>
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>© 2025 कृषिबंधू. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <Link to="/ask-question" style={styles.footerLink}>Ask a Question</Link>
          <Link to="/contact-us" style={styles.footerLink}>Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};

// ✅ Styling for a Beautiful UI
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    paddingBottom: "40px",
    backgroundImage: "url('/image.png')", // Add the background image
    backgroundSize: "cover", // Cover the entire container
    backgroundPosition: "center", // Center the image
  },
  
  featureScroll: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    gap: "20px",
    padding: "10px",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
  },
  
  hero: {
    background: "linear-gradient(to right, #2E8B57, #1B5E20)",
    color: "white",
    padding: "50px 20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  h3:{
fontSize:"35px"
  },
  subheading: {
    fontSize: "18px",
    marginTop: "10px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    display: "inline-block",
    background: "#FFA726",
    color: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    margin: "5px",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#EF6C00",
  },
  features: {
    padding: "40px 20px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    height:"400px",
    justifyContent: "center",
  },
  featureCardIcon: {
    fontSize: "60px",
    color: "#1B5E20",
  },
  featureCard: {
    minWidth: "250px", // for horizontal scroll
    scrollSnapAlign: "start",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Subtle shadow
    border: "2px solid rgb(164, 164, 164)",
    height: "350px",
    background: "#f4f4f4",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth animation
  },
  featureCardHover: {
    transform: "scale(1.03)", // Enlarges on hover
    boxShadow: "5px 15px 30px rgba(0, 0, 0, 0.4)", // Stronger shadow
    cursor: "pointer", // Pointer cursor
  },
  
  iconStyle: {
    fontSize: "2.5rem", // Slightly smaller to balance
    color: "#2f9d60",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px", // Added margin
  },
  description: {
    fontSize: "0.9rem",
    color: "#333",
    padding: "0 15px",
    lineHeight: "1.4", // Proper text spacing
    overflow: "hidden",
  },
  ctaSection: {
    background: "#2f9d607a",
    color: "white",
    padding: "40px 20px",
    borderRadius: "10px",
    margin: "20px auto",
    width: "80%",
    marginTop:"20%",
  },
  ctaButton: {
    display: "inline-block",
    background: "#FFA726",
    color: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    marginTop: "10px",
  },
  footer: {
    background: "#5f786a00",
    color: "white",
    padding: "20px",
    textAlign: "center",
    marginTop: "40px",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "10px",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  successStories: { padding: "40px 20px",},
  storyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" },
  storyCard: { padding: "20px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", textAlign: "center" },
  storyImage: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" },
  
};

export default Home;