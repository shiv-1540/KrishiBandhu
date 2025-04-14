import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HorizontalNav.css";

// Import images directly (adjust paths as needed)
import img1 from '../imgs/img1.png';
import img2 from '../imgs/img2.png';
import img3 from '../imgs/img3.png';
import img4 from '../imgs/img4.png';
import img5 from '../imgs/img5.png';
import img6 from '../imgs/img6.png';
import img7 from '../imgs/img7.png';
import img8 from '../imgs/img8.png';
import img9 from '../imgs/img9.png';
import img10 from '../imgs/img10.png';
import img11 from '../imgs/img11.png';
import img13 from '../imgs/img13.png';

const navItems = [
  { path: "/", image: img1, label: "Home" },
  { path: "/weather", image: img2, label: "Weather" },
  { path: "/schemes", image: img3, label: "Schemes" },
  { path: "/ecommerce", image: img4, label: "E-commerce" },
  { path: "/market-price", image: img5, label: "Market" },
  { path: "/FertilizerDealer", image: img6, label: "Dealers" },
  { path: "/news", image: img7, label: "News" },
  { path: "/loans", image: img8, label: "Loans" },
  { path: "/cold-storages", image: img9, label: "Cold Storage" },
  { path: "/learning-hub", image: img10, label: "Learning" },
  { path: "/Crop-Disease", image: img11, label: "Diseases" },
  { path: "/expert-advice", image: img13, label: "Expert" },
];

const HorizontalNav = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      container.classList.add("scrolling");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove("scrolling");
    };

    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove("scrolling");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="horizontal-nav-wrapper">
      <div className="horizontal-nav" ref={scrollRef}>
        {navItems.map((item, index) => (
          <Link to={item.path} className="nav-item" key={index}>
            <div className="icon-circle">
              <img 
                src={item.image} 
                alt={item.label} 
                className="nav-image"
                onError={(e) => {
                  e.target.style.display = 'none'; // Hide if image fails to load
                  console.error(`Image failed to load: ${item.image}`);
                }}
              />
            </div>
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalNav;