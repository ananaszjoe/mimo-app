import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ContentBit = {
  color?: string,
  text?: string,
  input?: boolean
}

export type Input = {
  startIndex: number,
  endIndex: number
}
export type Lesson = {
  id: number,
  content: ContentBit[],
  input?: Input
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