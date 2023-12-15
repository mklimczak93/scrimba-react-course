import React from "react"
import {decode} from 'html-entities'

export default function Question(props) {
    //cleaning question
    let question = decode(props.asking)
    //gathering all answers in one array
    let incorrectAnswersArray = props.incorrect_answers
    // incorrectAnswersArray.forEach((el) => decode(el))
    let correctAnswersArray = decode(props.correct_answer)
    let allAnswersArray = incorrectAnswersArray.concat(correctAnswersArray);

    //shuffling the array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
    }
    shuffleArray(allAnswersArray)
    let answer01 = allAnswersArray[0]
    let answer02 = allAnswersArray[1]
    let answer03 = allAnswersArray[2]
    let answer04 = allAnswersArray[3]

    const [chosenAnswers, setChosenAnswers] = React.useState([])

    function handleClick(answer) {
        console.log(answer)
        document.getElementById(answer).style.backgroundColor = '#D6DBF5'
        document.getElementById(answer).style.outline = 'none'
    }
    

    return (
        <div className='question-div'>
            <h4 className='question'>{question}</h4>
            <div className='answers-div'>
                <button className='button answer' id={answer01} onClick={ ()=> {handleClick(answer01)} } > {answer01} </button>
                <button className='button answer' id={answer02} onClick={ ()=> {handleClick(answer02)} } > {answer02} </button>
                <button className='button answer' id={answer03} onClick={ ()=> {handleClick(answer03)} } > {answer03} </button>
                <button className='button answer' id={answer04} onClick={ ()=> {handleClick(answer04)} } > {answer04} </button>
            </div>
        </div>
    )
}