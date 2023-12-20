import React from "react"
import {nanoid} from "nanoid"
import YellowBlob from "/src/assets/yellow-blob.svg"
import BlueBlob from "/src/assets/blue-blob.svg"
import useQuestion from "/src/components/Question.jsx"
import './App.css'

function App() {
  // --- --- --- GATHERING DATA --- --- --- //
  //error catching - creating fallback set of questions
  const questionsBeginningArray = [
    {"type":"multiple","difficulty":"easy","category":"Sports","question":"The Los Angeles Dodgers were originally from what U.S. city?","correct_answer":"Brooklyn","incorrect_answers":["Las Vegas","Boston","Seattle"]},
    {"type":"multiple","difficulty":"easy","category":"Science &amp; Nature","question":"Which of these bones is hardest to break?","correct_answer":"Femur","incorrect_answers":["Cranium","Humerus","Tibia"]},
    {"type":"multiple","difficulty":"easy","category":"Entertainment: Television","question":"In &quot;Rick And Morty&quot;, who shot &quot;Mr. Poopybutthole&quot; in the episode &quot;Total Rickall&quot;?","correct_answer":"Beth","incorrect_answers":["Rick","Jerry","Morty"]},
    {"type":"multiple","difficulty":"easy","category":"History","question":"Which of the following was Brazil was a former colony under?","correct_answer":"Portugal","incorrect_answers":["Spain","The Netherlands","France"]},
    {"type":"multiple","difficulty":"easy","category":"Entertainment: Video Games","question":"In CoD: Black Ops III, what is the name of the rogue A.I. antagonist?","correct_answer":"Corvus","incorrect_answers":["Cabal","Legion","Icarus"]}
  ]
  const answersBeginningArray = []
  questionsBeginningArray.forEach((object) => answersBeginningArray.push(object.correct_answer))

  //setting states of the quiz
  const [start, setStart]                     = React.useState(true)
  const [end, setEnd]                         = React.useState(false)
  //CHANGE successfulFetch to FALSE! changed to true for testing
  const [successfulFetch, setSuccessfulFetch] = React.useState(true)
  const [questions, setQuestions]             = React.useState(questionsBeginningArray)
  const [correctAnswers, setCorrectAnswers]   = React.useState(answersBeginningArray)
  const [userAnswers, setUserAnswers]         = React.useState([])
  const [result, setResult]                   = React.useState([])
  const [currentResult, setCurrentResult]     = React.useState(0)

  //fetching questions from Open Trivia Database
  React.useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple");
      const json = await data.json();
      if (json.response_code === 0) {
        setQuestions(json.results);
        setCorrectAnswers(json.results.forEach((result) => result.correct_answer));
        setSuccessfulFetch(true)
      } else {
        setSuccessfulFetch(false)
      }
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])
  
  // --- --- --- FUNCTIONS OF THE QUIZ --- --- --- //
  function startGame() {
    setStart(false)
  }

  //creating function for mapping
  function evaluateQuestion(question) {
    //for each question element we are getting the answer and question object
    const chosenAnswer = useQuestion(question).chosenAnswer;
    console.log('App component evQues func:',chosenAnswer)
    const RenderQuestion = useQuestion(question).render;
    // const { chosenAnswer, render } = useQuestion(question)
    //we are updating the collective answers State with the answer
    React.useEffect(()=>{
      setUserAnswers(prevAnswers => ([
        ...prevAnswers,
        chosenAnswer
      ]));
    },[chosenAnswer])
    
    //and returning the question object
    return (RenderQuestion)
  }
  //mapping over questions to get 5 components with question texts
  let questionsElements = questions.map(element => {
    return (evaluateQuestion(element))
  })
  


  // --- --- --- EVALUATING THE QUIZ RESULTS --- --- --- //
  //everytime user picks an answer, compare the answers and produce result
  React.useEffect(() => {
    userAnswers.forEach(element => {
      if (correctAnswers.includes(element)) {
        setResult(prevResult => ([
          ...prevResult,
          1
        ]))
    }})
    console.log('App component - user answers: ', userAnswers)
    let finalResult = checkResult()
    setCurrentResult(finalResult)
  }, [userAnswers])

  //checking the results
  function checkResult() {
    //getting the result
    let sum = 0
    for (let i = 0; i < result.length; i++ ) {
      sum += result[i];
    }
    console.log('Correct answers:', sum)
    return sum
  }

  function showResults() {
    setStart(false)
    setEnd(true)
  }

  function restartGame() {
    //CHANGE BACK TO FALSE AFTER TESTING!!!!!! ------------------------------------------!!!
    setEnd(false)
    setStart(true)
    setSuccessfulFetch(true)
    setQuestions(questionsBeginningArray)
    setCorrectAnswers(answersBeginningArray)
    setUserAnswers([])
    setResult([])
    
  }

  // --- --- --- RENDERING --- --- --- //
  return (
    <main>
      <img src={YellowBlob} className="blob" id="yellow-blob"></img>
     <div className="quiz">

        {/* --- --- --- END OF THE GAME --- --- --- */}
        {end && questionsElements}
        {end && <h3>You scored {currentResult}/5 correct answers</h3>}
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
