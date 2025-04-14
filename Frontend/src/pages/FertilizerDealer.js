import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FertilizerDealer.css";  // Importing CSS for styling

const API_URL = "https://krushi-backend-1.onrender.com/api/dealers";

function App() {
  const [dealers, setDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        setDealers(response.data.dealers);
        setStates(response.data.uniqueStates);
        setFilteredDealers(response.data.dealers);
      })
      .catch(error => console.error("Error fetching dealers:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      axios.get(`${API_URL}/${selectedState}`)
        .then(response => {
          setCities(response.data.uniqueCities);
          setFilteredDealers(response.data.dealers);
          setSelectedCity("");
        })
        .catch(error => console.error("Error fetching cities:", error))
        .finally(() => setLoading(false));
    } else {
      setCities([]);
      setFilteredDealers(dealers);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity && selectedState) {
      setLoading(true);
      axios.get(`${API_URL}/${selectedState}/${selectedCity}`)
        .then(response => {
          setFilteredDealers(response.data.dealers);
        })
        .catch(error => console.error("Error fetching dealers:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedCity, selectedState]);

  return (
    <div className="margin">
      <h1 className="title">Fertilizer Dealer Directory</h1>

      {/* Filters */}
      <div className="filters">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="select-box"
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          className="select-box"
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="table-container">
          <table className="dealer-table">
            <thead>
              <tr>
                <th>State</th>
                <th>City</th>
                <th>Dealer Name</th>
                <th>Contact</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredDealers.length > 0 ? (
                filteredDealers.map((dealer, index) => (
                  <tr key={index}>
                    <td>{dealer.State}</td>
                    <td>{dealer.City}</td>
                    <td>{dealer["Dealer Name"]}</td>
                    <td>{dealer["Mobile No"] || "N/A"}</td>
                    <td>{dealer.Address || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No dealers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
