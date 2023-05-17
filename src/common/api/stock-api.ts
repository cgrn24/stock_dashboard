import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
})

export const stockApi = {
  searchSymbol(query: string) {
    return instance.get<SearchSymbolResponseType>(`search?q=${query}&token=${process.env.API_KEY}`)
  },
  fetchStockDetails(stockSymbol: any) {
    return instance.get(`stock/profile2?symbol=${stockSymbol}&token=${process.env.API_KEY}`)
  },
  fetchQuote(stockSymbol: any) {
    return instance.get(`quote?symbol=${stockSymbol}&token=${process.env.API_KEY}`)
  },
  fetchHistoricalData(stockSymbol: any, resolution: any, from: any, to: any) {
    return instance.get(`stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.API_KEY}`)
  },
}

type SearchSymbolResponseType = {
  count: number
  result: SymbolType[]
}

type SymbolType = {
  currency: string
  description: string
  displaySymbol: string
  figi: string
  mic: string
  symbol: string
  type: string
}
