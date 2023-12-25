import React from "react"
import {decode} from 'html-entities'
import {nanoid} from "nanoid"

export default function Answer(props) {
    let answer = decode(props.answer)
    const styles = {
        backgroundColor: props.picked ? "#D6DBF5" : "#F5F7FB",
        // outline:         props.answer_picked ? 'none' : '1px solid #4D5B9E'
    }
    return <button className='button answer' id={nanoid()} onClick={props.chosen} style={styles}> {answer} </button>
                
        
    
}