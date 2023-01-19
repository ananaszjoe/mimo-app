import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Lesson = {
  id: number,
  content: {
    color: string,
    text: string
  }[]
}

export const useStore = create(
  persist(
    (set: Function, get: Function) => ({
      currentLesson: 0,
      lessons: [],
      fetchLessons: async () => {
        const response = await fetch('https://file-bzxjxfhcyh.now.sh/')
        const parsed = await response.json()
        set({ lessons: await parsed.lessons })
      },
      nextLesson: () => set({ currentLesson: get().currentLesson + 1})
    }),
    {
      name: 'mimo-app'
    }
  )
)