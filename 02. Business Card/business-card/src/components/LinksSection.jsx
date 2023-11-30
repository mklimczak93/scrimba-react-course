import React from "react"
import '/src/App.css'
import Facebook from "/src/assets/Facebook Icon.svg"
import GitHub from "/src/assets/GitHub Icon.svg"
import Instagram from "/src/assets/Instagram Icon.svg"
import LinkedIn from "/src/assets/LinkedIn Icon.svg"
import Twitter from "/src/assets/Twitter Icon.svg"

function LinksSection() {
    return (
        <div className="links-section">
            <a className="link" href="https://facebook.com/" target="_blank">
                <img src={Facebook} className="link-icon" alt="Facebook logo"></img>
            </a>
            <a className="link" href="https://github.com/" target="_blank">
                <img src={GitHub} className="link-icon" alt="GitHubk logo"></img>
            </a>
            <a className="link" href="https://instagram.com/" target="_blank">
                <img src={Instagram} className="link-icon" alt="Instagram logo"></img>
            </a>
            <a className="link" href="https://linkedin.com/" target="_blank">
                <img src={LinkedIn} className="link-icon" alt="LinkedIn logo"></img>
            </a>
            <a className="link" href="https://twitter.com/" target="_blank">
                <img src={Twitter} className="link-icon" alt="Twitter logo"></img>
            </a>
        </div>
    )
}

export default LinksSection