import React from "react";
import NewsList from "../components/NewsList.jsx";
import "./News.css"; // Import the CSS file

const News = () => {
  return (
    <div className="news-container">
      <h1>📰 Latest Agriculture News</h1>
      <NewsList />
    </div>
  );
};

export default News;
