import React from "react";
import "./hero.css";
function Hero() {
  return (
    <div className="heroMain">
      <div className="hero-left-text">
        <div className="hero-left-text-heading">Solitude in the City of Light</div>
        <div className="hero-left-text-title"><p>A lone figure crosses the bridge at twilight<><br /></>
        Where Paris whispers stories through its dimly lit windows</p></div>
      </div>
      <div className="hero-right-button">
        <button>Buy Now</button>
      </div>
    </div>
  );
}

export default Hero;
