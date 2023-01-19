import React, { useState } from 'react'
import { useStore, Lesson, ContentBit, Input } from './state'
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

  const Field = () => {
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setUserInput(e.currentTarget.value)
    }
    return <input type='text' value={userInput} onChange={handleChange} />
  }

  // needs refactor
  const insertInput = (content: ContentBit[], input: Input | undefined) => {
    if(!input) return content
    
    var result: ContentBit[] = []
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
            {insertInput(lesson.content, lesson.input).map((piece, index) => {
              
              if(piece.input) {
                return <Field />
              }
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
