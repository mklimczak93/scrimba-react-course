import React from "react"
import '/src/App.css'
import logobig from "/src/assets/react-icon-large.png"

function MainContent(props) {
    return (
        <div className= {props.darkMode ? "main-content dark" : "main-content"}>
        {/* <div className={props.darkMode ? "dark" : ""}> */}
            <div className="main-text">
                <h1 className="main-content-h1">Fun facts about React</h1>
                <ul className="main-content-ul">
                    
                    <li className="main-content-li">
                        Was first released in 2013
                    </li>
                    <li className="main-content-li">
                        Was originally created by Jordan Walke
                    </li>
                    <li className="main-content-li">
                        Has well over 100K stars on GitHub
                    </li>
                    <li className="main-content-li">
                        Is maintained by Facebook
                    </li>
                    <li className="main-content-li">
                        Powers thousands of enterprise apps, including mobile apps
                    </li>
                </ul>
            </div>
            <div className="image-container">
                <img src={logobig} className="background-logo" alt="React logo in the background"></img>
            </div>
        </div>
    )
}

export default MainContent