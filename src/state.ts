import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set: Function, get: Function) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
    }),
    {
      name: 'mimo-app'
    }
  )
)