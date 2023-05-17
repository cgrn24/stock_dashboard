import { create } from 'zustand'

type StoreType = {
  stockSymbol: string
  setStockSymbol: (symbol: string) => void
}

const useStore = create<StoreType>((set) => ({
  stockSymbol: 'FB',
  setStockSymbol: (symbol) => set((state) => ({ stockSymbol: symbol })),
}))
