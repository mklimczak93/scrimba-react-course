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
    let questionId = nanoid()
    //adding correct answer
    all_listed_answers.push(
      { 
        "question_id": questionId,
        "answer_id": nanoid(),
        "answer_picked": false,
        "answer_content": questionSet.correct_answer,
        "answer_correct": true
      })
    //adding incorrect answers
    for (let i=0; i<questionSet.incorrect_answers.length; i++) {
      let thisIncorrectAnswer = 
      {
        "question_id": questionId,
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
        "question_id": questionId,
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
            const fetchedAnswers = modifiedArray.map((el) => {
              let correctAnswer = {}
              for (let i=0; i<el.all_answers.length; i++) {
                if (el.all_answers[i].answer_correct === true) {
                  correctAnswer = el.all_answers[i]
                }
              }
              return correctAnswer
          })
            console.log(fetchedAnswers)
            setCorrectAnswers(fetchedAnswers);
            setSuccessfulFetch(true)
          } else {
            setSuccessfulFetch(false)
          }
        })
    }, [])

    
    
  //V02 --- --- --- CHOOSING ANSWER --- --- ---
  //helper functions 
  function checkUserAnswers(theArray, q_id) {
    let status = ''
    //checking if array is not empty
    if (theArray.length === 0) {
      status = false
    } else {
      let userAnswersIds = theArray.map((answer) => answer.question_id)
      if (userAnswersIds.includes(q_id)) {
        status = true
      } else {
        status = false
      }
    }
    return status
  }

  function removeFromArray(array, value) {
    //remove an answer with the same question ID!
    //removing by filter
    let newArray = []
    if (array.length === 0) {
      newArray = []
    } else {
      for (let i=0; i<array.length; i++) {
        if (array[i].question_id != value.question_id) {
          newArray.push(array[i])
        }
      }
      // newArray = array.map((el) => {
      //   if (el.question_id != value.question_id) {
      //     return el
      //   }
      // })
    }
    return newArray
  }

  function getCurrentQuestion(q_id) {
    let currentQuestion = {}
    for (let i=0; i<questions.length; i++) {
      if (questions[i].question.question_id === q_id) {
        currentQuestion = questions[i]
      }
    }
    return currentQuestion
  }

  function getCurrentAnswerByAnswerId(q_id, a_id) {
    let currentAnswer = {}
    for (let i=0; i<questions.length; i++) {
      if (questions[i].question.question_id === q_id) {
        for (let j=0; j<4; j++) {
          if (questions[i].all_answers[j].answer_id === a_id) {
            currentAnswer = questions[i].all_answers[j]
          }
        }
      }
    }
    
    return currentAnswer
  }

  function getOtherAnswers(q_id, a_id) {
    let currentAnswer = {}
    let otherAnswers = []
    for (let i=0; i<questions.length; i++) {
      if (questions[i].question.question_id === q_id) {
        for (let j=0; j<4; j++) {
          if (questions[i].all_answers[j].answer_id != a_id) {
            otherAnswers.push(questions[i].all_answers[j])
          }
        }
      }
    }
    return otherAnswers
  }
  function getPreviousAnswer(q_id, a_id) {
    let currentAnswer = getCurrentAnswerByAnswerId(q_id, a_id)
    let previousAnswers = userAnswers
    let prevAnswer = {}
    for (let i=0; i<previousAnswers.length; i++) {
      if (previousAnswers[i].question_id === q_id) {
        prevAnswer = previousAnswers[i]
      }
    }
    console.log('Previous answer: ', prevAnswer)
    return prevAnswer
  }

  //controlling state updates
  React.useEffect(() => {
    console.log('User Answer State updated:', userAnswers);
  }, [userAnswers]);
  React.useEffect(() => {
    console.log('Questions State updated:', questions);
  }, [questions]);

  //ACTUAL CHOOSING ANSWER FUNCTION
  function chooseAnswer(q_id, a_id) {
    // --- PART 01 --- check if this question already has an answer
    let currentQuestion = getCurrentQuestion(q_id)
    let currentAnswerA = getCurrentAnswerByAnswerId(q_id, a_id)
    if (checkUserAnswers(userAnswers, q_id) === true) {
      console.log('This question already has an answer')
      //if so - change answer_picked in questions.question.all_answers.answer[i]
      setQuestions(prevQuestions => {
        let newQuestionsArray = []
        let previousAnswer = getPreviousAnswer(q_id, a_id)
        let otherAnswers = getOtherAnswers(q_id, a_id)
        let changedQuestion = {}
        let allAnswersWithTheNewOne = []
        for (let i=0; i<prevQuestions.length; i++) {
          if (prevQuestions[i].question.question_id === q_id) {
            let oldAnswers = prevQuestions[i].all_answers
              previousAnswer = {
                ...previousAnswer,
                "answer_picked": false
              }
              for (let j=0; j<oldAnswers.length; j++) {
                if (oldAnswers[j].answer_id === previousAnswer.answer_id) {
                  allAnswersWithTheNewOne.push(previousAnswer)
                } else {
                  allAnswersWithTheNewOne.push(oldAnswers[j])
                }
              }
              changedQuestion = {
                ...currentQuestion,
                "all_answers": allAnswersWithTheNewOne
              }
            newQuestionsArray.push(changedQuestion)
          } else {
            newQuestionsArray.push(prevQuestions[i])
            }
          }
          return newQuestionsArray
      })
      //if so - delete answer from userAnswers
      setUserAnswers(prevAnswers => {
        let newUserAnswersArray = []
        newUserAnswersArray = removeFromArray(prevAnswers, currentAnswerA)
        return newUserAnswersArray
      })
      
    } 
    // --- PART 02 --- then (not else!)
    //add new answer to userAnswers
    //change it picked status
    currentAnswerA = {
      ...currentAnswerA,
      "answer_picked": true
    }
    setUserAnswers(prevAnswers => {
      let newUserAnswersArray = []
      newUserAnswersArray = [
        ...prevAnswers,
        currentAnswerA
      ]
      return newUserAnswersArray
    })
    //update answer_picked in questions.question.all_answers.answer[i]
    setQuestions(prevQuestions => {
      let newQuestionsArray = []
      let changedAnswer = getCurrentAnswerByAnswerId(q_id, a_id)
      let otherAnswers = getOtherAnswers(q_id, a_id)
      let changedQuestion = {}
      let allAnswersWithTheNewOne = []
      for (let i=0; i<prevQuestions.length; i++) {
        if (prevQuestions[i].question.question_id === q_id) {
          let oldAnswers = prevQuestions[i].all_answers
            changedAnswer = {
              ...changedAnswer,
              "answer_picked": true
            }
            for (let j=0; j<oldAnswers.length; j++) {
              if (oldAnswers[j].answer_id === a_id) {
                allAnswersWithTheNewOne.push(changedAnswer)
              } else {
                allAnswersWithTheNewOne.push(oldAnswers[j])
              }
            }
            changedQuestion = {
              ...currentQuestion,
              "all_answers": allAnswersWithTheNewOne
            }
            newQuestionsArray.push(changedQuestion)
          } else {
            newQuestionsArray.push(prevQuestions[i])
          }
        }
        return newQuestionsArray
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
          <Answer id = {answer01.answer_id + '-button'} class={answer01.answer_picked ? 'button answer selected' : 'button answer'} answer = {answer01.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer01.answer_id)} } picked = {answer01.answer_picked} correct = {answer01.answer_correct}/>
          <Answer id = {answer02.answer_id + '-button'} class={answer02.answer_picked ? 'button answer selected' : 'button answer'} answer = {answer02.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer02.answer_id)} } picked = {answer02.answer_picked} correct = {answer01.answer_correct}/>
          <Answer id = {answer03.answer_id + '-button'} class={answer03.answer_picked ? 'button answer selected' : 'button answer'} answer = {answer03.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer03.answer_id)} } picked = {answer03.answer_picked} correct = {answer01.answer_correct}/>
          <Answer id = {answer04.answer_id + '-button'} class={answer04.answer_picked ? 'button answer selected' : 'button answer'} answer = {answer04.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer04.answer_id)} } picked = {answer04.answer_picked} correct = {answer01.answer_correct}/>
        </div> 
      </div>
    )
    })


  // --- --- --- GAMEPLAY --- --- --- //

  //starting the game
  function startGame() {
    setStart(false)
  }

  function assignClass(answer) {
    let assignedClassName = 'button answer'
    if (answer.answer_correct) {
      assignedClassName = 'button answer correct'
    } else if (answer.answer_correct === false && answer.answer_picked === true) {
      assignedClassName = 'button answer incorrect'
    } else {
      assignedClassName = 'button answer'
    }
    return assignedClassName
  }


  const questionsElementsFinal = questions.map((question) => {
    //creating answers objects
    const answer01 = question.all_answers[0]
    const answer02 = question.all_answers[1]
    const answer03 = question.all_answers[2]
    const answer04 = question.all_answers[3]
    let theQuestionId = question.question.question_id
    //assigning right class
    const class01 = assignClass(answer01)
    const class02 = assignClass(answer02)
    const class03 = assignClass(answer03)
    const class04 = assignClass(answer04)
    //returning element per question
    return (
      <div className='question-div'>
        <Question question = {question.question.question_content}/>
        <div className='answers-div'>
          <Answer id = {answer01.answer_id + '-button'} class={class01} answer = {answer01.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer01.answer_id)} } picked = {answer01.answer_picked} correct = {answer01.answer_correct}/>
          <Answer id = {answer02.answer_id + '-button'} class={class02} answer = {answer02.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer02.answer_id)} } picked = {answer02.answer_picked} correct = {answer01.answer_correct}/>
          <Answer id = {answer03.answer_id + '-button'} class={class03} answer = {answer03.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer03.answer_id)} } picked = {answer03.answer_picked} correct = {answer01.answer_correct}/>
          <Answer id = {answer04.answer_id + '-button'} class={class04} answer = {answer04.answer_content} chosen ={ ()=>{chooseAnswer(theQuestionId, answer04.answer_id)} } picked = {answer04.answer_picked} correct = {answer01.answer_correct}/>
        </div> 
      </div>
    )
    })

  function showResults() {
    const correctAnswersIds = correctAnswers.map(answer => answer.answer_id)
    const userAnswersIds = userAnswers.map(answer => answer.answer_id)
    userAnswersIds.map(element => {
      if (correctAnswersIds.includes(element)) {
        setResult(prevResult => prevResult + 1)
    }})
    //V01 - coloring the buttons
    // const correctAnswersBUTTONSIds = correctAnswersIds.map((el) => {
    //   return (el+'-button')
    // })
    // const buttonsArray = correctAnswersBUTTONSIds.map((el) => {
    //   const button = document.getElementById(el)
    //   //button.style.backgroundColor = '#94D7A2'
    //   button.className = 'button answer correct'
    //   return button
    // })
    

    
      //if other answer was selected - mark it red
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
        {end && questionsElementsFinal}
        {end && <h3 className='score-title'>You scored {result}/5 correct answers</h3>}
        {end && <button className="button action" onClick={restartGame}>Play again</button>}

        {/* --- --- --- LOADING QUESTIONS --- --- --- */}
        {!start && !end && (successfulFetch ? questionsElements : <h3>Loading questions...</h3>)}
        {!start && !end && (successfulFetch && <button className="button action" onClick={showResults} >Check answers</button>)}

        {/* --- --- --- START OF THE GAME --- --- --- */}
        {start && <div className="start-screen">
            <h1>Quizzical</h1>
            <h5 className='score-title'>A simple quiz game with questions from Open Trivia Database</h5>
            <button className="button action" onClick={startGame}>Start quiz</button>
          </div>}

     </div>
     <img src={BlueBlob} className="blob" id="blue-blob"></img>
    </main>
  )
}

export default App
