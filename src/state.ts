import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ContentBitType = {
  color?: string,
  text?: string,
  input?: boolean
}

export type InputType = {
  startIndex: number,
  endIndex: number
}
export type LessonType = {
  id: number,
  content: ContentBitType[],
  input?: InputType
}

export type LogPostType = {
  id: number,
  startTime: number,
  completeTime: number
}

interface MimoAppState {
  lessons: LessonType[],
  log: Iterable<LogPostType>,
  currentStartTime: number,
  pending: boolean,
  fetchLessons: () => Promise<void>,
  startTimer: () => Promise<void>,
  setCompleted: (id: number) => Promise<void>,
  checkSolution: (solution: string) => Promise<boolean>
}

export const useStore = create<MimoAppState>()(
  persist(
    (set: Function, get: Function) => ({
      lessons: [] as LessonType[],
      log: [] as Iterable<LogPostType>,
      currentStartTime: 0,
      pending: false as boolean,
      fetchLessons: async () => {
        const response = await fetch('https://file-bzxjxfhcyh.now.sh/')
        const parsed = await response.json()
        get().startTimer()
        set({ lessons: await parsed.lessons })
      },
      startTimer: async () => {
        const now = new Date()
        set({currentStartTime: now.getTime()})
      },
      setCompleted: async (id) => {
        const now = new Date()
        const currentLog = Array.from(get().log)
        get().startTimer()
        set({
          log: [...currentLog, {
            id,
            startTime: get().currentStartTime,
            completeTime: now.getTime()
          }]
        })
      },
      checkSolution: async (solution) => {
        set({pending: true})

        // I'd fetch backend validation, e.g. const response = await fetch('https://api.getmimo.com/v2/validate', {options})
        // For now though, here's a mock async delay:
        const mockDelay = new Promise(function(resolve) {
          setTimeout(resolve, Math.random()*1500);
        });
        await mockDelay

        set({pending: false})
        
        if(solution.trim() !== 'wrong') {
          return true
        }
        return false
      }
    }),
    {
      name: 'mimo-app'
    }
  )
)