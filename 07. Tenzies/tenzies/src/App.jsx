import React from "react"
import Confetti from "react-confetti"
import Die from "/src/components/Die.jsx"
import {nanoid} from "nanoid"
import './App.css'

export default function App() {
  // MAIN FUNCTIONS
  //getting random integer from 1 to 6
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    // The maximum is exclusive and the minimum is inclusive
  }

  //creating an array with 10 random numbers (range 1-6)
  function allNewDice() {
    let diceNumbersArray=[];
    for (let i=0; i<10; i++) {
      const newNumber = getRandomInt(1, 7)
      diceNumbersArray.push(
        {id:   nanoid(),
        value:  newNumber, 
        isHeld: false}) 
    }
    return diceNumbersArray
  }
  
  //setting up state with beginning 10 random dice
  const [diceArray, setDiceArray] = React.useState(allNewDice())
  //mapping over diceArray creating a die element for each number
  const diceElements = diceArray.map((object) => {
      return <Die key={object.id} value={object.value} picked={object.isHeld} hold= {()=> {holdDice(object.id)} }/>
      })

 function rollDice() {
  setDiceArray(prevDiceArray => {
    const newDiceArray = []
    prevDiceArray.forEach(function(i){
      if (i.isHeld === false) {
        const newNumber = getRandomInt(1, 7)
        newDiceArray.push(
        {id:   i.id,
        value:  newNumber, 
        isHeld: false})
      } else {
        newDiceArray.push(i)
      }
    }) 
    return newDiceArray
  })
  }

 function holdDice(diceId) {
    setDiceArray(prevDiceArray => {
      const newDiceArray = []
      prevDiceArray.forEach(function(i){
        if (i.id != diceId) {
          newDiceArray.push(i)
        } else {
          const newEl = {id:   diceId,
                        value: i.value, 
                        isHeld: !i.isHeld}
          newDiceArray.push(newEl)
        }
      }) 
      return newDiceArray
    })
 }

  //creating a Tenzies state for determining winning, setting it originally to 'false'
  const [tenzies, setTenzies] = React.useState(false)
  const button = document.getElementById('action-button')

  //helper function checking if all numbers in array have the same value
  function valueCheck(array) {
    return array.every(element => element === array[0])
  }
  //returning to beginning stage of the game
  function startGame() {
    setDiceArray(allNewDice)
    setTenzies(false)
    button.onclick = rollDice
  }

  //creating Effect for winning
  React.useEffect(()=> {
    let checkArray = []
    diceArray.forEach(function(el) {
      if (el.isHeld === true) {
        checkArray.push(el.value)
      }
    })
    if (checkArray.length === 10 && valueCheck(checkArray)) {
      setTenzies(true)
      console.log('winning!')
      button.onclick = startGame
    }
  },[diceArray])

//  React.useEffect(()=> {
//   const holdingDice = onSnapshot(diceArray, function(snapshot) {

//   })
//   return holdingDice 
//  }, [diceArray])

  // const [dice, setDice] = React.useState(allNewDice())
  // const [tenzies, setTenzies] = React.useState(false)
  
  // React.useEffect(() => {
  //     const firstValue = dice[0].value
  //     const allHeld = dice.every(die => die.held)
  //     const allSameNumber = dice.every(die => die.value === firstValue)
  //     if(allHeld && allSameNumber) {
  //         setTenzies(true)
  //     }
  // }, [dice])
  
  // function randomDieValue() {
  //     return Math.ceil(Math.random() * 6)
  // }

  // function allNewDice() {
  //     const newArray = []
  //     for(let i = 0; i < 10; i++) {
  //         const newDie = {
  //             value: randomDieValue(),
  //             held: false,
  //             id: i + 1
  //         }
  //         newArray.push(newDie)
  //     }
  //     return newArray
  // }

  // function rollUnheldDice() {
  //     if (!tenzies) {
  //         setDice((oldDice) => oldDice.map((die, i) =>
  //             die.held ? 
  //                 die : 
  //                 { value: randomDieValue(), held: false, id: i + 1 }
  //         ))
  //     } else {
  //         setDice(allNewDice())
  //         setTenzies(false)
  //     }
  // }

  // function holdDice(id) {
  //     setDice(prevDice => prevDice.map(die => {
  //         return die.id === id ? 
  //             {...die, held: !die.held} : 
  //             die
  //     }))
  // }

  // const diceElements = dice.map((die) => (
  //     <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  // ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='main-title'>Tenzies</h1>
      <h3 className='main-description'>
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </h3>
      <div className='dices-group'>
        {diceElements}
      </div>
      <button className='action-button' onClick={rollDice} id='action-button'>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
    </main>
)
}


      // <main>
      //     {tenzies && <Confetti />}
      //     <h1>Tenzies</h1>
      //     <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      //     <div className="die-container">{diceElements}</div>
      //     <button className="roll-dice" onClick={rollUnheldDice}>
      //         {tenzies ? "Reset Game" : "Roll"}
      //     </button>
      // </main>
  
