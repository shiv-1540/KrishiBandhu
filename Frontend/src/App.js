import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing the Pages
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
import UserDashboard from "./components/Dashboard/UserDashboard";

// Authentication
import LandingPage from "./pages/LandingPage";
import AuthenticateLayout from "./pages/Auth/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";


function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>

          <Route index path="/home" element={<LandingPage />} />
          <Route path="/login" element={<AuthenticateLayout><Login/></AuthenticateLayout>} />
          <Route path="/register" element={<AuthenticateLayout><Register/></AuthenticateLayout>} />
          <Route path="/forgot-password" element={<AuthenticateLayout><ForgotPassword/></AuthenticateLayout>} />


          <Route path="/" element={<UserDashboard><Home /></UserDashboard>} />
          <Route path="/weather" element={<UserDashboard><Weather /></UserDashboard>} />
          <Route path="/schemes" element={<UserDashboard><Schemes /></UserDashboard>} />
          <Route path="/ecommerce" element={<UserDashboard><Ecommerce /></UserDashboard>} />
          <Route path="/market-price" element={<UserDashboard><MarketPrice /></UserDashboard>} />
          <Route path="/FertilizerDealer" element={<UserDashboard><FertilizerDealer /></UserDashboard>} />
          <Route path="/news" element={<UserDashboard><News /></UserDashboard>} />
          <Route path="/loans" element={<UserDashboard><LoanPage /></UserDashboard>} />
          <Route path="/YieldSellForm" element={<UserDashboard><YieldSellForm /></UserDashboard>} />
          <Route path="/cold-storages" element={<UserDashboard><ColdStorageLocator /></UserDashboard>} />
          <Route path="/learning-hub" element={<UserDashboard><LearningHub /></UserDashboard>} />
          <Route path="/farmer-tools" element={<UserDashboard><FarmerTools /></UserDashboard>} />
          <Route path="/farmer-to-business" element={<UserDashboard><FarmerToBusiness /></UserDashboard>} />
          <Route path="/business-to-farmer" element={<UserDashboard><BusinessToFarmer /></UserDashboard>} />
          <Route path="/crop-disease" element={<UserDashboard><CropDisease /></UserDashboard>} />
          {/* <Route path="/expert-advice/*" element={<UserDashboard><ExpertAdvice /></UserDashboard>} />  */}
          <Route path="/expert" element={<UserDashboard><Expert/></UserDashboard>} /> 
          <Route path="/room/:roomId" element={<UserDashboard><RoomPage /></UserDashboard>} />
          <Route path="/crop-recommendation" element={<UserDashboard><CropRecom /></UserDashboard>} /> 
          <Route path="/all-users" element={<UserDashboard><AllUsers /></UserDashboard>} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;