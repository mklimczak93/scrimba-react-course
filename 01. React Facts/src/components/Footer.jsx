import React from "react"
import '/src/App.css'

function Footer(props) {
    return (
        <div className={props.darkMode ? "footer dark" : "footer"}>
            <p className="footer-text">© 2023 Scrimba development. All rights reserved</p>
        </div>
    )
}

export default Footer