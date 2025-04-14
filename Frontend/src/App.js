import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Schemes from "./pages/Schemes";
import Ecommerce from "./pages/Ecommerce";
import MarketPrice from "./pages/MarketPrice";
import FertilizerDealer from "./pages/FertilizerDealer";
import News from "./pages/News";
import LoanPage from "./pages/LoanPage";
import YieldSellForm from "./pages/AddYield";
import ColdStorageLocator from "./pages/ColdStorageLocator";
import "./App.css"; // Import the CSS file
import LearningHub from "./pages/LearningHub";
import FarmerTools from "./pages/FarmerTools"; // ✅ Import Farmer Tools Page
import FarmerToBusiness from "./pages/FarmerToBusiness"; // ✅ Import Farmer to Business Page
import BusinessToFarmer from "./pages/BusinessToFarmer"; // ✅ Import Business-to-Farmer Page
import CropDisease from "./pages/Crop-Disease";
import ExpertAdvice from "./pages/ExpertAdvice";
import Expert from "./pages/Expert"; // ✅ Lobby Screen
import { SocketProvider } from "./context/SocketProvider"; // ✅ Import SocketProvider
import RoomPage from "./components/Room";
import CropRecom from "./pages/CropRecom"; // ✅ Import Crop Recommendation Page
import AllUsers from "./pages/allUsers";


function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/market-price" element={<MarketPrice />} />
              <Route path="/FertilizerDealer" element={<FertilizerDealer />} />
              <Route path="/news" element={<News />} />
              <Route path="/loans" element={<LoanPage />} />
              <Route path="/YieldSellForm" element={<YieldSellForm />} />
              <Route path="/cold-storages" element={<ColdStorageLocator />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/farmer-tools" element={<FarmerTools />} />
              <Route path="/farmer-to-business" element={<FarmerToBusiness />} />
              <Route path="/business-to-farmer" element={<BusinessToFarmer />} />
              <Route path="/crop-disease" element={<CropDisease />} />
              <Route path="/expert-advice/*" element={<ExpertAdvice />} /> {/* ✅ Updated Expert Advice */}
              <Route path="/expert" element={<Expert/>} /> {/* ✅ Lobby Screen */}
              <Route path="/room/:roomId" element={<RoomPage />} />
              <Route path="/crop-recommendation" element={<CropRecom />} /> {/* ✅ Crop Recommendation Page */}
              <Route path="/all-users" element={<AllUsers />} /> {/* ✅ All Users Page */}

            </Routes>
          </div>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;