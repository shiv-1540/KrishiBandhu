import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom Icons
const coldStorageIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  popupAnchor: [0, -15]
});

const userLocationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [40, 40],
  popupAnchor: [0, -20]
});

// Component to handle map centering
const CenterMap = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

const ColdStorageLocator = () => {
  const [storages, setStorages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStorages, setNearbyStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(10);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const mapRef = useRef();

  const API_URL = "https://innoverse.avishkar.digital/api/cold-stores";

  useEffect(() => {
    fetchColdStorages();
    getUserLocation();
  }, []);

  const fetchColdStorages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const data = Array.isArray(response.data) ? response.data : response.data.records || [];
      setStorages(data);
    } catch (error) {
      console.error("Error fetching cold storages:", error);
      setError("Failed to load cold storage data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Could not determine your location. Showing all cold storages.");
          setUserLocation({ lat: 20.5937, lng: 78.9629 });
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Showing all cold storages.");
      setUserLocation({ lat: 20.5937, lng: 78.9629 });
    }
  };

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (userLocation && storages.length > 0) {
      const filtered = storages
        .filter(storage => {
          const matchesSearch = storage["Storage name"]?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              storage.Address?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCapacity = !capacityFilter || 
                                (storage["Capacity in MT"] && 
                                parseInt(storage["Capacity in MT"]) >= capacityFilter);
          const distance = getDistance(
            userLocation.lat,
            userLocation.lng,
            parseFloat(storage.Latitude),
            parseFloat(storage.Longitude)
          );
          return matchesSearch && matchesCapacity && distance <= distanceFilter;
        })
        .map(storage => ({
          ...storage,
          distance: getDistance(
            userLocation.lat,
            userLocation.lng,
            parseFloat(storage.Latitude),
            parseFloat(storage.Longitude)
          )
        }))
        .sort((a, b) => a.distance - b.distance);

      setNearbyStorages(filtered);
    }
  }, [userLocation, storages, searchTerm, capacityFilter, distanceFilter]);

  const handleRefresh = () => {
    fetchColdStorages();
    getUserLocation();
  };

  const handleStorageClick = (storage) => {
    setSelectedStorage(storage);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span role="img" aria-label="map">🗺️</span> Cold Storage Locator
        </h1>
        <p style={styles.subtitle}>
          Find nearby cold storage facilities with real-time location tracking
        </p>
      </div>

      {error && (
        <div style={styles.errorAlert}>
          <p>{error}</p>
        </div>
      )}

      <div style={styles.content}>
        {/* Filters Section */}
        <div style={styles.filterCard}>
          <h2>Search Filters</h2>
          <button 
            style={styles.refreshButton}
            onClick={handleRefresh} 
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
          
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          
          <div style={styles.filterRow}>
            <select 
              value={capacityFilter || ''}
              onChange={(e) => setCapacityFilter(e.target.value ? parseInt(e.target.value) : null)}
              style={styles.filterSelect}
            >
              <option value="">All Capacities</option>
              <option value="10">10+ MT</option>
              <option value="50">50+ MT</option>
              <option value="100">100+ MT</option>
              <option value="200">200+ MT</option>
            </select>
            
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(parseInt(e.target.value))}
              style={styles.filterSelect}
            >
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
              <option value="100">100 km</option>
            </select>
          </div>
        </div>

        {/* Map Section */}
        <div style={styles.mapCard}>
          <h2>Location Map</h2>
          {loading && !userLocation ? (
            <div style={styles.loadingContainer}>Loading map...</div>
          ) : userLocation ? (
            <div style={styles.mapContainer}>
              <MapContainer 
                center={[userLocation.lat, userLocation.lng]} 
                zoom={12} 
                style={styles.map}
                whenCreated={(map) => { mapRef.current = map; }}
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  attribution='&copy; OpenStreetMap contributors'
                />

                <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
                  <Popup>Your Location</Popup>
                </Marker>

                {nearbyStorages.map((storage, index) => {
                  const lat = parseFloat(storage.Latitude);
                  const lng = parseFloat(storage.Longitude);
                  
                  if (isNaN(lat) || isNaN(lng)) return null;
                  
                  return (
                    <Marker 
                      key={index} 
                      position={[lat, lng]} 
                      icon={coldStorageIcon}
                      eventHandlers={{
                        click: () => handleStorageClick(storage),
                      }}
                    >
                      <Popup>
                        <div style={styles.popupContent}>
                          <h4 style={styles.popupTitle}>{storage["Storage name"]}</h4>
                          <div style={styles.divider}></div>
                          <p>
                            <span role="img" aria-label="location">📍</span> {storage.Address}
                          </p>
                          <p>
                            <span role="img" aria-label="info">ℹ️</span> Capacity: {storage["Capacity in MT"]} MT
                          </p>
                          <span style={styles.distanceTag}>
                            ~{storage.distance.toFixed(2)} km away
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
                
                {selectedStorage && (
                  <CenterMap 
                    center={[
                      parseFloat(selectedStorage.Latitude), 
                      parseFloat(selectedStorage.Longitude)
                    ]} 
                    zoom={15} 
                  />
                )}
              </MapContainer>
            </div>
          ) : (
            <div style={styles.loadingContainer}>Initializing map...</div>
          )}
        </div>

        {/* Nearby Cold Storages List */}
        <div style={styles.listCard}>
          <h2>Nearby Cold Storages ({nearbyStorages.length} found)</h2>
          {loading ? (
            <div style={styles.loadingContainer}>Loading storages...</div>
          ) : nearbyStorages.length > 0 ? (
            <div style={styles.storageList}>
              {nearbyStorages.map((storage, index) => (
                <div 
                  key={index} 
                  style={{ 
                    ...styles.storageCard,
                    backgroundColor: selectedStorage === storage ? '#f0f0f0' : 'white'
                  }}
                  onClick={() => handleStorageClick(storage)}
                >
                  <div style={styles.storageCardContent}>
                    <div>
                      <h3 style={styles.storageName}>{storage["Storage name"]}</h3>
                      <p style={styles.storageAddress}>
                        <span role="img" aria-label="location">📍</span> {storage.Address}
                      </p>
                      <div style={styles.storageMeta}>
                        <span style={styles.capacityTag}>{storage["Capacity in MT"]} MT Capacity</span>
                        <span style={styles.distanceText}>~{storage.distance.toFixed(2)} km away</span>
                      </div>
                    </div>
                    <div style={styles.distanceBadge}>
                      {storage.distance.toFixed(1)} km
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              No cold storages found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling remains the same as in your original file
const styles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    paddingBottom: 40,
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px 20px',
    backgroundColor: '#2E8B57',
    color: 'white',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 8,
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    margin: 0,
  },
  errorAlert: {
    backgroundColor: '#fff2f0',
    border: '1px solid #ffccc7',
    padding: '10px 15px',
    margin: '0 auto 20px',
    maxWidth: 1200,
    borderRadius: 4,
    color: '#ff4d4f',
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
  },
  filterCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: 20,
    marginBottom: 24,
  },
  mapCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: 20,
    marginBottom: 24,
  },
  listCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: 20,
  },
  refreshButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    padding: '8px 16px',
    marginBottom: 16,
    cursor: 'pointer',
  },
  searchInput: {
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: 4,
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
  },
  filterRow: {
    display: 'flex',
    gap: 16,
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: 4,
    minWidth: 180,
  },
  mapContainer: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    height: 500,
    width: '100%',
    borderRadius: 8,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  popupContent: {
    minWidth: 200,
  },
  popupTitle: {
    marginTop: 0,
    color: '#1890ff',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    margin: '8px 0',
  },
  distanceTag: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 12,
  },
  storageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  storageCard: {
    border: '1px solid #eee',
    borderRadius: 8,
    padding: 15,
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  storageCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageName: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 500,
  },
  storageAddress: {
    color: '#666',
    marginBottom: 8,
  },
  storageMeta: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  capacityTag: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 12,
  },
  distanceText: {
    color: '#1890ff',
    fontSize: 12,
  },
  distanceBadge: {
    backgroundColor: '#1890ff',
    borderRadius: 20,
    padding: '8px 12px',
    color: 'white',
    fontWeight: 500,
    minWidth: 80,
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    padding: 40,
    color: '#888',
  },
};

export default ColdStorageLocator;