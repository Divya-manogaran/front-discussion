import React from "react";
import { Link } from "react-router-dom";
import '../styles/home.css';  // Ensure correct path to CSS file

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to the Discussion Forum</h1>
        <p className="home-description">Join the conversation, share your thoughts, and engage with others.</p>
        <Link to="/discussions" className="home-link">Go to Discussions</Link>
      </header>
      
      <div className="home-content">
        <h2 className="home-section-title">What We Offer</h2>
        <p className="home-section-description">
          Engage in a variety of topics and express your ideas with like-minded individuals.
        </p>
      </div>
    </div>
  );
};

export default Home;
