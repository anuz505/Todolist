import React from "react";
import "./hero.css";
const handleClick = () => {
  window.location.href = "/signup";
};
const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>List It and Forget It</h1>

        <p>
          Welcome to the to-do list app that takes your endless sea of tasks and
          turns it into… well,
          <br /> a slightly less endless sea. But hey, baby steps.Whether it’s
          mundane chores or epic goals, we make managing your life a breeze.
        </p>
        <button className="hero-button" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
