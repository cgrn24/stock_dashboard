import { create } from 'zustand'

export type StoreType = {
  stockSymbol: string
  setStockSymbol: (symbol: string) => void
}

export const useStore = create<StoreType>()((set) => ({
  stockSymbol: 'FB',
  setStockSymbol: (symbol) => set({ stockSymbol: symbol }),
}))
