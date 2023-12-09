import React from "react"
import '/src/App.css'
import logo from "/src/assets/react.svg"

function Header(props) {
    return (
        <header>
            {/* <nav className = "navbar"> */}
            <nav className = {props.darkMode ? "dark" : ""}>
                <a href="index.html">
                    <img src={logo} className="react-logo" alt="React logo"></img>
                    <h3 className="navbar-title">React Facts</h3>
                </a>
                {/* <p className="navbar-text2">React course - Project 1</p> */}
                {/* <ul className="navbar-links">
                        <li className="navbar-link">Pricing</li>
                        <li className="navbar-link">About</li>
                        <li className="navbar-link">Contact</li>
                    </ul> */}
                <div className="toggler">
                    <p className="toggler--light">Light</p>
                    <div className="toggler--slider" onClick={props.toggleDarkMode}>
                    {/* <div className="toggler--slider" onClick={props.toggleDarkMode}> */}
                        <div className="toggler--slider--circle">
                        </div>
                    </div>
                    <p className="toggler--dark">Dark</p>
                </div>
            </nav>
        </header>
    )
}

export default Header