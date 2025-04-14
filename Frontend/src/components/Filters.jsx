import React from 'react';
import "./SchemeCard";

const SchemeCard = ({ title, ministry, description, tags, data }) => {
    return (
        <div className="scheme-card">
            <h3>{title}</h3>
            <p>{ministry}</p>
            <p>{description}</p>
            {tags && tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
            ))}
            <button><a href={data.link} className="apply-now-btn" target="_blank" rel="noopener noreferrer">
                Apply Now
            </a></button>
            
        </div>
    );
};

export default SchemeCard;