import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Lesson = {
  id: number,
  content: {
    color: string,
    text: string
  }[],
  input?: {
    startIndex: number,
    endIndex: number
  }
}

export const useStore = create(
  persist(
    (set: Function, get: Function) => ({
      lessons: [],
      fetchLessons: async () => {
        const response = await fetch('https://file-bzxjxfhcyh.now.sh/')
        const parsed = await response.json()
        set({ lessons: await parsed.lessons })
      }
    }),
    {
      name: 'mimo-app'
    }
  )
)