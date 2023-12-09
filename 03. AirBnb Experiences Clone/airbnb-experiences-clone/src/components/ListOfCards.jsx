import React from 'react'
import '/src/App.css'
import Card from '/src/components/Card.jsx'
import CardData from '/src/data.js'


function ListOfCards() {
    const Cards = CardData.map(element => {
        return <Card
        key         = {element.id}
        title       = {element.title}
        description = {element.description} 
        price       = {element.price}
        image       = {element.coverImg}
        rating      = {element.stats.rating}
        reviewsno   = {element.stats.reviewCount}
        location    = {element.location}
        openSpots   = {element.openSpots}
        />
    })
    //alternative way to do it
    // const Cards = CardData.map(element => {
    //     return <Card
    //     key     = {element.id}
    //     element = {element}
    //     -- or --
    //     {...element}
    //     />
    // })
    return (
        <div className="list-of-cards">
            <div className="list-of-cards-inner">
               {Cards}
            </div>
        </div>
    )
}

export default ListOfCards