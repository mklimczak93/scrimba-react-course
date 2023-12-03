import React from 'react'
import '/src/App.css'
import Star from '/src/assets/star-icon.svg'

function Card(props) {
    return(
        <div className="card">
            <img src={props.image} className="card-image" alt="Experience photo"></img>
            <div className="card-text">
                <div className="card-details">
                    {props.location === "Online" && <div className="card-status">Online</div>}
                    {props.openSpots === 0 && <div className="card-status">Sold out</div>}
                    <img src={Star} className="ratings-icon"></img>
                    <h4 className="card-rating">{props.rating}({props.reviewsno}) </h4>
                    <h4 className="card-rating-details"> • {props.location}</h4>
                </div>
                <h4 className="card-title">{props.title}</h4>
                <h3 className="card-price"><strong>From ${props.price}</strong>/person</h3>
            </div>
        </div>
    )
};

export default Card