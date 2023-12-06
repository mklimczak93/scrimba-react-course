import React from 'react'
import '/src/App.css'
import Logo from '/src/assets/Troll Face.png'

function Header() {
    return(
        <div className="header">
            <nav className="navbar">
                <div className="web-title">
                    <img src={Logo} className="meme-logo" alt="Meme Generator Logo"></img>
                    <h3 className="header-title">Meme Generator</h3>
                </div>
                <h5 className="project-title">React Course - Project 3</h5>
            </nav>

        </div>
    )
}

export default Header