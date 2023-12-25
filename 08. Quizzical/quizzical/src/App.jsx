import React from "react"
import {nanoid} from "nanoid"
import {decode} from 'html-entities'
import YellowBlob from "/src/assets/yellow-blob.svg"
import BlueBlob from "/src/assets/blue-blob.svg"
import Question from "/src/components/Question.jsx"
import Answer from "/src/components/Answer.jsx"
import './App.css'

function App() {
  //setting states of the quiz
  const [start, setStart]                     = React.useState(true)
  const [end, setEnd]                         = React.useState(false)
  //CHANGE successfulFetch to FALSE! changed to true for testing
  const [successfulFetch, setSuccessfulFetch] = React.useState(false)
  const [questions, setQuestions]             = React.useState([])
  const [correctAnswers, setCorrectAnswers]   = React.useState([])
  const [userAnswers, setUserAnswers]         = React.useState([])
  const [result, setResult]                   = React.useState(0)

  
  // --- --- --- FUNCTIONS OF THE QUIZ --- --- --- //
  //shuffling the array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
  }

  //aletering the questions object to add the ids
  function addId(questionSet) {
    let all_listed_answers = []
    //adding correct answer
    all_listed_answers.push(
      {
        "answer_id": nanoid(),
        "answer_picked": false,
        "answer_content": questionSet.correct_answer,
        "answer_correct": true
      })
    //adding incorrect answers
    for (let i=0; i<questionSet.incorrect_answers.length; i++) {
      let thisIncorrectAnswer = {
        "answer_id": nanoid(),
        "answer_picked": false,
        "answer_content": questionSet.incorrect_answers[i],
        "answer_correct": false
      }
      all_listed_answers.push(thisIncorrectAnswer)
    }
    //shuffling array
    shuffleArray(all_listed_answers);
    return {
      "question": {
        "question_id": nanoid(),
        "question_content": questionSet.question,
        "correct_answer": questionSet.question.correct_answer
      },
      "all_answers": all_listed_answers
    }
  }

  //V01 - fetching questions from Open Trivia Database
  // React.useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const data = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple");
  //     const json = await data.json();
  //     if (json.response_code === 0) {
  //       const modifiedArray = (json.results).map((question) => addId(question))
  //       setQuestions(modifiedArray);
  //       let fetchedAnswers = []
  //       json.results.map((result) => {
  //         let singleAnswer = decode(result.correct_answer)
  //         fetchedAnswers.push(singleAnswer)
  //       })
  //       setCorrectAnswers(fetchedAnswers);
  //       setSuccessfulFetch(true)
  //     } else {
  //       setSuccessfulFetch(false)
  //     }
  //   }
  //   // call the function
  //   fetchData()
  //   console.log('Questions: ', questions)
  //   console.log('Correct answers: ', correctAnswers)
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, [])

    //V02 - fetching questions from Open Trivia Database
    React.useEffect(() => {
      // declare the data fetching function
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(data => {
          if (data.response_code === 0) {
            //setting questions in already modified form
            const modifiedArray = (data.results).map((question) => addId(question))
            setQuestions(modifiedArray);
            //getting correct answers
            let fetchedAnswers = []
            questions.map((el) => {
              for (let i=0; i<el.all_answers.length; i++) {
                if (el.all_answers[i].answer_correct === true) {
                  fetchedAnswers.push(el.all_answers[i])
                } 
              }
            })
            console.log(fetchedAnswers)
            setCorrectAnswers(fetchedAnswers);
            setSuccessfulFetch(true)
          } else {
            setSuccessfulFetch(false)
          }
        })
    }, [])
    console.log(correctAnswers)
  //creating a new array of questions with added id fields
  // const modifiedArray1 = questions.map((question) => addId(question))
  // const [modifiedArray, setModifiedArray] = React.useState(modifiedArray1)

  //choosing answer function
  function chooseAnswer(q_id, a_id) {
    //modyfing the original questions to change the color
    setQuestions(prevQuestions => {
      //finding in which question the answer was picked
      let currentQuestion = {}
      let existingAnswer = {}
      let previousAnswers = []

      let chosenAnswer = {}
      let updatedQuestion = {}
      let updatedAnswers = []
      let updatedQuestions = []
      for (let j=0; j<prevQuestions.length; j++) {
        if (prevQuestions[j].question.question_id === q_id) {
          currentQuestion = prevQuestions[j];
          //checking if an answer for this question was already picked
          for (let i=0; i<currentQuestion.all_answers.length; i++) {
            console.log(currentQuestion.all_answers[i].answer_picked)
            if (currentQuestion.all_answers[i].answer_picked === true) {
              existingAnswer = {
                ...currentQuestion.all_answers[i],
                answer_picked: false
              }
              previousAnswers.push(existingAnswer)
              setUserAnswers(prevAnswers => {
                return prevAnswers.filter(e => e != existingAnswer.answer_content)
              })
            } else {
              previousAnswers.push(currentQuestion.all_answers[i])
            }
          }
          //changing the answer picked status of the chosen question
          for (let i=0; i<currentQuestion.all_answers.length; i++) {
            if (currentQuestion.all_answers[i].answer_id === a_id) {
              chosenAnswer = {
                ...currentQuestion.all_answers[i],
                answer_picked: !currentQuestion.all_answers[i].answer_picked
              }
              updatedAnswers.push(chosenAnswer);
              console.log(currentQuestion.all_answers[i].answer_content)
              //adding that answer to useranswers state
              setUserAnswers(prevAnswers => {
                return [...prevAnswers, 
                  {
                  "question_id": q_id,
                  "answer": currentQuestion.all_answers[i].answer_content
                  }
                ]
              })
            } else {
              updatedAnswers.push(currentQuestion.all_answers[i])
            }
          }
         //changing the current question 
          updatedQuestion = {
            ...prevQuestions[j],
            'all_answers': updatedAnswers
          }
          updatedQuestions.push(updatedQuestion)
        } else {
          updatedQuestions.push(prevQuestions[j])
        }
      }
      //updating state
      console.log(userAnswers)
      return updatedQuestions
    })
  }


  // SETTING UP QUESTIONS
  const questionsElements = questions.map((question) => {
    //creating answers objects
    const answer01 = question.all_answers[0]
    const answer02 = question.all_answers[1]
    const answer03 = question.all_answers[2]
    const answer04 = question.all_answers[3]
    let theQuestionId = question.question.question_id
    //returning element per question
    return (
      <div className='question-div'>
        <Question question = {question.question.question_content}/>
        <div className='answers-div'>
          <Answer answer = {answer01.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer01.answer_id)} } picked = {answer01.answer_picked}/>
          <Answer answer = {answer02.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer02.answer_id)} } picked = {answer02.answer_picked}/>
          <Answer answer = {answer03.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer03.answer_id)} } picked = {answer03.answer_picked}/>
          <Answer answer = {answer04.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer04.answer_id)} } picked = {answer04.answer_picked}/>
        </div> 
      </div>
    )
    })


  // --- --- --- GAMEPLAY --- --- --- //

  //starting the game
  function startGame() {
    setStart(false)
  }


  function showResults() {
    userAnswers.map(element => {
      if (correctAnswers.includes(element)) {
        setResult(prevResult => prevResult + 1)
    }})
    setStart(false)
    setEnd(true)
  }

  function restartGame() {
    //CHANGE BACK FETCH TO FALSE AFTER TESTING!!!!!! ------------------------------------------!!!
    setEnd(false)
    setStart(true)
    setSuccessfulFetch(false)
    setQuestions([])
    setCorrectAnswers([])
    setUserAnswers([])
    setResult(0)
  }

  // --- --- --- RENDERING --- --- --- //
  return (
    <main>
      <img src={YellowBlob} className="blob" id="yellow-blob"></img>
      <div key="quiz" className="quiz">

        {/* --- --- --- END OF THE GAME --- --- --- */}
        {end && questionsElements}
        {end && <h3>You scored {result}/5 correct answers</h3>}
        {end && <button className="button action" onClick={restartGame}>Play again</button>}

        {/* --- --- --- LOADING QUESTIONS --- --- --- */}
        {!start && !end && (successfulFetch ? questionsElements : <h3>Loading questions...</h3>)}
        {!start && !end && (successfulFetch && <button className="button action" onClick={showResults} >Check answers</button>)}

        {/* --- --- --- START OF THE GAME --- --- --- */}
        {start && <div className="start-screen">
            <h1>Quizzical</h1>
            <h5>A simple quiz game with questions from Open Trivia Database</h5>
            <button className="button action" onClick={startGame}>Start quiz</button>
          </div>}

     </div>
     <img src={BlueBlob} className="blob" id="blue-blob"></img>
    </main>
  )
}

export default App
