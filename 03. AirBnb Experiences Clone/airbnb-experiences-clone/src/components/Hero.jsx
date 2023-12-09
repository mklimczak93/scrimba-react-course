import React from 'react'
import '/src/App.css'
import Heroimage from '/src/assets/hero-image.png'

function Hero() {
    return(
        <div className="hero">
            <div className="hero-inner">
                <img src={Heroimage} className="hero-image"></img>
                <div className="hero-text">
                    <h1 className="hero-h1">Online Experiences</h1>
                    <h4 className="hero-h4">
                        Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.
                    </h4>
                </div>
            </div>
        </div>
    )
};

export default Hero