import React from "react"
import '/src/App.css'
import MKphoto from "/src/assets/MK_photo_02.png"
import Mail from "/src/assets/mail.svg"

function InfoSection() {
    return (
        <div className="info-section">
             <img src={MKphoto} className="photo" alt="Magdalena Klimczak photo"></img>
             <div className="info-section-titles">
                <div>
                    <h3 className="h3-name">Magdalena Klimczak</h3>
                    <h2 className="h2-title">Frontend Developer</h2>
                    <h1 className="h1-website">mk.fakewebsite.com</h1>
                </div>
                <button type="button" className="button">
                    <img src={Mail} className="mail-icon" alt="E-mail icon"></img>
                    <p className="email-text">E-mail</p>
                </button>
             </div>
        </div>     
    )
}

export default InfoSection