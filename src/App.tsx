import { useState } from 'react'
import { useStore, Lesson } from './state'
import './App.css'

function App() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [userInput, setUserInput] = useState('')
  const fetchLessons = useStore((state) => state.fetchLessons)
  const lesson: Lesson = useStore((state) => state.lessons[currentLesson])

  const handleContinue = () => {
    setCurrentLesson(currentLesson + 1)
    setUserInput('')
  }

  return (
    <div className="App">
      <div className="card">
        {
          !lesson && (
            <button onClick={fetchLessons}>
              Begin Exercises 
            </button>
          )
        }
      </div>
      {lesson && (
        <>
          <div className="card">
            {lesson.content.map(piece => {
              return <span style={{color: piece.color}}>{piece.text}</span>
            })}
          </div>
          <div className="card">
            {(!lesson.input || userInput !== '') && (
              <button onClick={handleContinue}>
                Continue 
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
