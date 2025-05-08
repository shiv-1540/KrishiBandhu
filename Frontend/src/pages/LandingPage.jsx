import React from 'react'
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import bgland from '../imgs/bgland.png';
import disdet from '../imgs/disedet.png'
import './land.css';


// Reusable Feature Card Component
const FeatureCard = ({ image, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
    <img src={disdet} alt={title} className="w-41 h-10 rounded-md mb-4" />
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

// Reusable Benefit Card Component
const BenefitCard = ({ image, title, description }) => (
  <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
    <img src={image} alt={title} className="w-24 h-24 rounded-full mb-4" />
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div  className="w-full relative bg-cover bg-center" >

      <Navbar />

      <div id="land" className="relative h-screen flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: `url(${bgland})` }}>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center text-white h-screen ">
        <h1 className="text-6xl font-extrabold mb-4 text-gray-800">Welcome to Pikvardhan</h1>
        <p className="text-xl mb-6 max-w-3xl text-gray-800">
          Empowering farmers with AI-driven solutions for crop management and better yields.
        </p>
        <a 
          href="/login" 
          className="bg-green-500 text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Get Started
        </a>
      </section>

      </div>
     
      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              image="../assets/imgs/disdet.png" 
              title="Disease Detection" 
              description="AI-powered tools to identify crop diseases quickly and accurately."
            />
           
            <FeatureCard 
              image="/images/fertilizer_recommendation.jpg" 
              title="Fertilizer Recommendations" 
              description="Personalized suggestions to maximize crop health and yield."
            />
            <FeatureCard 
              image="/images/farmer_collaboration.jpg" 
              title="Farmer Collaboration" 
              description="Join a thriving community to share knowledge and best practices."
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              title="What is Pikvardhan?" 
              description="Pikvardhan is an AI-driven platform that assists farmers with crop disease detection, fertilizer recommendations, and collaborative tools for better farming practices."
            />
            <FeatureCard 
              title="How does it benefit farmers?" 
              description="Our platform provides smart solutions to increase productivity, reduce costs, and improve decision-making through technology."
            />
            <FeatureCard 
              title="Is Pikvardhan free to use?" 
              description="We offer both free and premium plans. The free plan provides basic tools, while the premium plan includes advanced features."
            />
            <FeatureCard 
              title="How can I get started?" 
              description="Simply sign up on our platform, and you'll have access to our tools and community in minutes!"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Benefits of Pikvardhan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              image="/images/cost_saving.jpg" 
              title="Cost Efficiency" 
              description="Reduce farming expenses by making informed decisions on fertilizers and pest control."
            />
            <BenefitCard 
              image="/images/increased_yield.jpg" 
              title="Increased Yield" 
              description="Boost productivity with AI-based tools that guide you step-by-step."
            />
            <BenefitCard 
              image="/images/eco_friendly.jpg" 
              title="Eco-Friendly Practices" 
              description="Adopt sustainable methods that benefit the environment and the community."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-800 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farming?</h2>
        <p className="mb-8">Sign up today and experience the future of agriculture!</p>
        <a 
          href="/signup" 
          className="bg-white text-blue-800 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Join Now
        </a>
      </section>
    </div>
  );
};



export default LandingPage