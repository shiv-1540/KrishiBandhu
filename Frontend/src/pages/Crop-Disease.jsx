import React from 'react';

import Home from '../components/Crop-Home';
import Submit from '../components/Crop-Submit';
import Market from '../components/Crop-Market';

import './Crop-Disease.css'; // Import your CSS file for styling

const CropDisease = () => {
    return (
        <div>
            {/* Main content */}
            <div className="container">
                {/* Home Section */}
                <section id="home">
                    <Home />
                </section>

                {/* Submit Section */}
                <section id="submit" className="section">
                    <Submit />
                </section>

                {/* Market Section */}
                <section id="market" className="section">
                    <Market />
                </section>
            </div>
        </div>
    );
};

export default CropDisease;