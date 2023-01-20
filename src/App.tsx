import React, { useState } from 'react'
import { useStore, LessonType, ContentBitType, InputType } from './state'
import './App.css'

function App() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)
  const fetchLessons = useStore((state) => state.fetchLessons)
  const setCompleted = useStore((state) => state.setCompleted)
  const lesson: LessonType = useStore((state) => state.lessons[currentLesson])


  // needs refactor
  const insertInput = (content: ContentBitType[], input: InputType | undefined) => {
    if(!input) return content
    
    var result: ContentBitType[] = []
    let currentLength = 0

    content.forEach(piece => {
      var currentText = ''
      
      piece.text && piece.text.split('').forEach(letter => {
        if(currentLength === input.startIndex) {
          if(!!currentText.length) result.push({color: piece.color, text: currentText})
          currentText = ''
          result.push({input: true})
        }
        if(currentLength + 1 <= input.startIndex || currentLength >= input.endIndex) {
          currentText += letter
        }
        currentLength++
      })
      result.push({color: piece.color, text: currentText})
    });
    return result
  }
  
  const handleContinue = () => {
    if(userInput === 'wrong') { // mock validation
      setMessage(`The solution to the lesson is not "${userInput}"`)
      return
    } else if(currentLesson === (useStore.getState().lessons.length - 1)) { // reached the end of lessons
      setDone(true)
      setCompleted(lesson.id)
    } else { // progress to next lesson
      setCompleted(lesson.id)
      setCurrentLesson(currentLesson + 1)
    }
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
            {insertInput(lesson.content, lesson.input).map((piece, index) => {
              
              if(piece.input) {
                return <input type='text' value={userInput} onChange={handleChange} />
              }
              return <span style={{color: piece.color}}>{piece.text}</span>
            })}
          </div>
          <div className="card">
            <button onClick={handleContinue} disabled={!!lesson.input && userInput == ''}>
              {lesson.input ? 'Check solution' : 'Continue' }
            </button>
            {message && (
              <p>{message}</p>
            )}
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
