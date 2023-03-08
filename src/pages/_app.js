import React, { useEffect } from 'react'
import Die from './components/Die'
import Header from './components/Header'
import "../styles/globals.css"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {
  const [diceArray, setDiceArray] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)

  function allNewDice() {
    const newArr = []
    for (let i = 0; i < 10; i++) {
      newArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newArr
  }

  function setDice() {
    setDiceArray(prevState =>
      prevState.map(currentDie => {
        return currentDie.isHeld ?
          currentDie :
          {
            ...currentDie,
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
          }
      })
    )
  }


  function holdDice(id) {
    setDiceArray(prevState =>
      prevState.map(currentDie => {
        return currentDie.id === id ? { ...currentDie, isHeld: !currentDie.isHeld } : currentDie
      })
    )
  }

  useEffect(() =>
    setDiceArray(allNewDice)
    , [])

  useEffect(() => {
    if (diceArray[0] !== undefined) {
      const allHeld = diceArray.every(currentDie => currentDie.isHeld)
      const firstValue = diceArray[0].value
      const allSameValue = diceArray.every(currentDie => currentDie.value === firstValue)
      if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
      }
    }
  }, [diceArray])

  function newGame() {
    setDiceArray(allNewDice)
    setTenzies(false)
  }


  const diceElements = diceArray.map((currentDie) =>
    <Die key={currentDie.id} value={currentDie.value} holdDice={() => holdDice(currentDie.id)} isHeld={currentDie.isHeld} />
  )


  return (
    <main className="main--body">
      <Header />
      {tenzies && <Confetti/>}
      <div className="container">
        {diceElements}
      </div>
      <div className='btn--roll' onClick={!tenzies? setDice : newGame }>
        <h2>{`${!tenzies ? "Roll" : "New Game"}`}</h2>
      </div>

    </main>
  )
}
