import React from "react"
import '/src/App.css'
import logo from "/src/assets/react.svg"

function Header() {
    return (
        <header>
            <nav className = "navbar">
                <a href="index.html">
                    <img src={logo} className="react-logo" alt="React logo"></img>
                    <h3 className="navbar-title">React Facts</h3>
                </a>
                {/* <p className="navbar-text2">React course - Project 1</p> */}
                <ul className="navbar-links">
                    <li className="navbar-link">Pricing</li>
                    <li className="navbar-link">About</li>
                    <li className="navbar-link">Contact</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header