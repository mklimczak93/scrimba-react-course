import React from "react"
import {nanoid} from "nanoid"
import YellowBlob from "/src/assets/yellow-blob.svg"
import BlueBlob from "/src/assets/blue-blob.svg"
import Question from "/src/components/Question.jsx"
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
  const [successfulFetch, setSuccessfulFetch] = React.useState(true)
  const [questions, setQuestions]             = React.useState(questionsBeginningArray)
  const [correctAnswers, setCorrectAnswers]   = React.useState(answersBeginningArray)
  const [userAnswers, setUserAnswers]         = React.useState([])
  const [result, setResult]                   = React.useState([])

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
  function chooseAnswer(newAnswer) {
    setUserAnswers(prevAnswers => (
      [...prevAnswers,
      newAnswer]
    ))
  }

  // --- --- --- EVALUATING THE QUIZ RESULTS --- --- --- //
  React.useEffect(() => {

  }, [result])

  //mapping over questions to get 5 components with question texts
  let questionsElements = questions.map(element => 
  <Question 
    key = {nanoid()}
    asking={element.question} 
    correct_answer={element.correct_answer} 
    incorrect_answers={element.incorrect_answers} 
    // chosen = {()=> {chooseAnswer(element.user_answer)}}
  />)


  // --- --- --- RENDERING --- --- --- //
  return (
    <main>
      <img src={YellowBlob} className="blob" id="yellow-blob"></img>
     <div className="quiz">
        {!start && (successfulFetch ? questionsElements : <h3>Loading questions...</h3>)}
        {!start && (successfulFetch && <button className="button action">Check answers</button>)}
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
