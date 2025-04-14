import React, { useEffect, useState } from 'react';

const Market = () => {
    const [supplements, setSupplements] = useState([]);

    useEffect(() => {
        const fetchSupplements = async () => {
            const response = await fetch('/market'); // Adjust the endpoint as needed
            const data = await response.json();
            setSupplements(data);
        };

        fetchSupplements();
    }, []);

    return (
        <div className="market-container">
            <h1>Supplement Market</h1>
            <div className="supplement-list">
                {supplements.map((supplement, index) => (
                    <div key={index} className="supplement-item">
                        <img src={supplement.image} alt={supplement.name} width="200" height="250" />
                        <h5>{supplement.name}</h5>
                        <p>{supplement.description}</p>
                        <a href={supplement.buyLink} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-success">Buy Product</button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Market;