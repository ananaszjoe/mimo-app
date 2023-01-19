import { useStore, Lesson } from './state'
import './App.css'

function App() {
  const fetchLessons = useStore((state) => state.fetchLessons)
  const nextLesson = useStore((state) => state.nextLesson)
  const lesson: Lesson = useStore((state) => state.lessons[state.currentLesson])

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
            <button onClick={nextLesson}>
              Next Lesson 
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
