import React from 'react'
import '/src/App.css'
import Airbnblogo from '/src/assets/airbnb-logo.svg'

function Header() {
    return(
        <div className="header">
            <nav className="navbar">
                <img src={Airbnblogo} className="airbnb-logo"></img>
            </nav>

        </div>
    )
}

export default Header