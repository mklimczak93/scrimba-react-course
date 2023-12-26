import React from "react"
import {decode} from 'html-entities'
import {nanoid} from "nanoid"

export default function Answer(props) {
    let answer = decode(props.answer)
    //using the classes instead of styles in the end
    const styles = {
        backgroundColor: props.picked ? "#D6DBF5" : "#F5F7FB"
    }
    const stylesCorrect = {
        backgroundColor: '#94D7A2'
    }
    const stylesIncorrect = {
        backgroundColor: '#F8BCBC'
    }
    return <button className={props.class} id={props.id} onClick={props.chosen}> {answer} </button>
                
        
    
}