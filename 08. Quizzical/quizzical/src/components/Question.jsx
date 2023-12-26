import React from "react"
import {decode} from 'html-entities'

export default function Question(props) {
    //cleaning question
    let question = decode(props.question)

    return <h4 className='question'>{question}</h4>
            
        
    
}