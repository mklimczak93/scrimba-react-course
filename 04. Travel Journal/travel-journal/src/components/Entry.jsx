import React from 'react'
import '/src/App.css'
import LocationMarker from '/src/assets/location-icon.svg'

function Entry(props) {
    return(
        <div className="entry">
            <img src={props.image} className="entry-image" alt="Travel journal entry photo"></img>
            <div className="entry-text">
                <div className="location-details">
                    <img src={LocationMarker} className="location-marker" alt="Location Marker Icon"></img>
                    <h4 className="entry-location">{props.location}</h4>
                    <a className="google-maps-link" target="_blank" href={`https://www.google.com/maps/place/${props.location}`}>View on Google Maps</a>
                </div>
                <h2 className="entry-title">{props.title}</h2>
                <h3 className="entry-date">{props.date}</h3>
                <p className="entry-description">{props.description}</p>
            </div>
            <hr className="separator" />
        </div>
    )
};

export default Entry