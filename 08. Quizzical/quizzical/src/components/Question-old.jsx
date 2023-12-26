import React from "react"
import {decode} from 'html-entities'

export default function useQuestion(props) {
    //cleaning question
    let question = decode(props.question)
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

    //execute shuffle only once when question changes
    shuffleArray(allAnswersArray)
    let answer01 = allAnswersArray[0]
    let answer02 = allAnswersArray[1]
    let answer03 = allAnswersArray[2]
    let answer04 = allAnswersArray[3]

    const [chosenAnswer, setChosenAnswer] = React.useState('No answer')

    
    function chooseAnswer(newAnswer) {
        console.log('Question component - clicked:', newAnswer);
        setChosenAnswer(newAnswer);
        //setting colors for other answers
        allAnswersArray.forEach((id) => {
            let button = document.getElementById(id);
            button.style.backgroundColor = '#F5F7FB';
            button.style.outline='1px solid #4D5B9E';
        })
        //setting colors for the chosen answer
        document.getElementById(newAnswer).style.backgroundColor = '#D6DBF5';
        document.getElementById(newAnswer).style.outline = 'none';
        console.log('Question component - chosen answer state:', chosenAnswer);
      }

    // function handleClick(answer) {
    //     console.log(answer)
    //     document.getElementById(answer).style.backgroundColor = '#D6DBF5'
    //     document.getElementById(answer).style.outline = 'none'
    // }
    // const handleChange = (e) => {
    //     setChosenAnswers(e.target.value)            
    // }

    // return (
    //     { chosenAnswer: chosenAnswer,
    //         RenderQuestion: (
    //         <div className='question-div'>
    //             <h4 className='question'>{question}</h4>
    //             <div className='answers-div'>
    //                 {/* <button className='button answer' id={answer01} onClick={ ()=> {handleClick(answer01)} } > {answer01} </button> */}
    //                 <button className='button answer' onClick={ ()=> chooseAnswer(answer01) } > {answer01} </button>
    //                 <button className='button answer' onClick={ ()=> chooseAnswer(answer02) }  > {answer02} </button>
    //                 <button className='button answer' onClick={ ()=> chooseAnswer(answer03) }  > {answer03} </button>
    //                 <button className='button answer' onClick={ ()=> chooseAnswer(answer04) }  > {answer04} </button>
    //             </div>
    //         </div>
    //         )
    //     }
        
    // )
    return { 
        chosenAnswer: chosenAnswer,
        render: (
        <div className='question-div'>
            <h4 className='question'>{question}</h4>
            <div className='answers-div'>
                {/* <button className='button answer' id={answer01} onClick={ ()=> {handleClick(answer01)} } > {answer01} </button> */}
                <button className='button answer' id={answer01} onClick={ ()=> chooseAnswer(answer01) } > {answer01} </button>
                <button className='button answer' id={answer02} onClick={ ()=> chooseAnswer(answer02) }  > {answer02} </button>
                <button className='button answer' id={answer03} onClick={ ()=> chooseAnswer(answer03) }  > {answer03} </button>
                <button className='button answer' id={answer04} onClick={ ()=> chooseAnswer(answer04) }  > {answer04} </button>
                <h6>Chosen answer is now {chosenAnswer}</h6>
            </div>
        </div>)
    }
        
    
}