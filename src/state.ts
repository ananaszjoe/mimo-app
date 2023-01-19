import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set: Function, get: Function) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
      lessons: [],
      fetchLessons: async () => {
        const response = await fetch('https://file-bzxjxfhcyh.now.sh/')
        const parsed = await response.json()
        set({ lessons: await parsed.lessons })
      },
    }),
    {
      name: 'mimo-app'
    }
  )
)