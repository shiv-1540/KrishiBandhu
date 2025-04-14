import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RentProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);

  // Static product data
  const staticProducts = [
    {
      _id: "1",
      equipment_name: "Tractor",
      description: "A powerful tractor for all your farming needs.",
      rent_price_per_day: 1500,
      city: "Pune",
      state: "Maharashtra",
      start_date: "2023-04-01",
      end_date: "2023-12-31",
      images: ["https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=I4W9X04yBTDXSw&riu=http%3a%2f%2fblog.machinefinder.com%2fwp-content%2fuploads%2f2015%2f08%2f9RX-Tractor-1.jpg&ehk=B61Jyj3YwiF6NbI%2bk3dMvxJoRf%2bS%2feNlZDeiTeMX5E4%3d&risl=&pid=ImgRaw&r=0"]
    },
    {
      _id: "2",
      equipment_name: "Plough",
      description: "A sturdy plough for efficient soil preparation.",
      rent_price_per_day: 500,
      city: "Nagpur",
      state: "Maharashtra",
      start_date: "2023-04-01",
      end_date: "2023-12-31",
      images: ["https://www.fieldking.com/images/tillage/plough/sm/disc-plough-(domestic).png"]
    },
    {
      _id: "3",
      equipment_name: "Harvester",
      description: "A high-performance harvester for quick harvesting.",
      rent_price_per_day: 2000,
      city: "Nashik",
      state: "Maharashtra",
      start_date: "2023-04-01",
      end_date: "2023-12-31",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcFHGaqUFl8_3wIQYDJDb_NzcqfRZHmdKMQ&s"]
    },
    {
      _id: "5",
      equipment_name: "grains",
      description: "Add More Whole Grains to Your Diet Using These 3 Steps | Howdy Health.",
      rent_price_per_day: 160,
      city: "khamgaon",
      state: "Maharashtra",
      start_date: "2023-04-01",
      end_date: "2023-12-31",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-7BFz-aR_NreAB_hEZrSp-4O09eJHRgYdBw&s"]
    },
    {
      _id: "4",
      equipment_name: "tomato",
      description: "a fleshy, often red, fruit (botanically) but commonly used as a vegetable, belonging to the nightshade family (Solanaceae) and native to South America",
      rent_price_per_day: 190,
      city: "Shegaon",
      state: "Maharashtra",
      start_date: "2023-04-01",
      end_date: "2023-12-31",
      images: ["data:image/jpeg;base64,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"]
    }
  ];

  useEffect(() => {
    setProducts(staticProducts);  // Set static products on initial render
  }, []);

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter products based on state and city
    const filtered = staticProducts.filter(product => {
      return (
        (filters.state === "" || product.state.toLowerCase().includes(filters.state.toLowerCase())) &&
        (filters.city === "" || product.city.toLowerCase().includes(filters.city.toLowerCase()))
      );
    });
    setProducts(filtered);
    if (filtered.length > 0) {
      toast.success("Products filtered successfully!");
    } else {
      toast.error("No products found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Rent Products</h2>

        {/* Filter Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Enter state"
            />
          </div>

          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Enter city"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {/* Product Cards */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{product.equipment_name}</h3>
                    <p className="text-gray-600">{product.description}</p>

                    <div className="mt-4">
                      <p className="text-green-600 font-bold">
                        ₹{product.rent_price_per_day} / day
                      </p>
                      <p>📍 {product.city}, {product.state}</p>
                      <p>🗓️ {new Date(product.start_date).toLocaleDateString()} - {new Date(product.end_date).toLocaleDateString()}</p>
                    </div>

                    {/* Image Display */}
                    {product.images?.length > 0 && (
                      <div className="mt-4">
                        <img
                          src={product.images[0]}
                          alt={product.equipment_name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RentProductList;
