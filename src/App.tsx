import React, { useState } from 'react'
import { useStore, LessonType } from './state'
import { insertInput } from './utils'
import './App.css'

function App() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)

  const fetchLessons = useStore((state) => state.fetchLessons)
  const setCompleted = useStore((state) => state.setCompleted)
  const checkSolution = useStore((state) => state.checkSolution)
  const pending = useStore((state) => state.pending)
  const lesson: LessonType = useStore((state) => state.lessons[currentLesson])
  
  const handleContinue = async () => {
    const correct = await checkSolution(userInput) // mock validation
    if(!correct) {
      setMessage(`The solution to the lesson is not "${userInput}"`) // making it an oxymoron, for fun
      return
    } else if(currentLesson === (useStore.getState().lessons.length - 1)) { // reached the end of lessons
      setDone(true)
    } else { // progress to next lesson
      setCurrentLesson(currentLesson + 1)
    }
    setCompleted(lesson.id)
    setUserInput('')
    setMessage('')
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value)
  }

  const handleRestart = () => {
    setCurrentLesson(0)
    setDone(false)
  }  

  return (
    <div className="App">
      <div className="card">
        {
          !lesson && !done && (
            <button onClick={fetchLessons}>
              Begin Exercises 
            </button>
          )
        }
      </div>
      {lesson && !done && (
        <>
          <div className="card">
            {insertInput(lesson.content, lesson.input).map(piece => {              
              if(piece.input) {
                return <input type='text' value={userInput} onChange={handleChange} />
              }
              return <span style={{color: piece.color}}>{piece.text}</span>
            })}
          </div>

          <div className="card">
            <button onClick={handleContinue} disabled={!!lesson.input && userInput == '' || pending} className={pending ? 'pending' : ''}>
              {lesson.input ? 'Check solution' : 'Next' }
            </button>
            {message && <p>{message}</p>}
          </div>
        </>
      )}
      {done && (
        <div className="card">
          <p>Done</p>
          <button onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  )
}

export default App
