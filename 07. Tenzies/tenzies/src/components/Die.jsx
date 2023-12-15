import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.picked ? "#59E391" : "white"
    }

    return (
        <div className='die' onClick={props.hold} style={styles}>
            <h4 className='die-number'>{props.value}</h4>
        </div>
    )
}