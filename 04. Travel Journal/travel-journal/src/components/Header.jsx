import React from 'react'
import '/src/App.css'
import Logo from '/src/assets/journal-logo.svg'

function Header() {
    return(
        <div className="header">
            <nav className="navbar">
                <img src={Logo} className="journal-logo" alt="Journal Logo"></img>
                <h3 className="journal-title">my travel journal.</h3>
            </nav>

        </div>
    )
}

export default Header