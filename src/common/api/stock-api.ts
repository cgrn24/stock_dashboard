import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
})

export const stockApi = {
  searchSymbol(query: string) {
    return instance.get<SearchSymbolResponseType>(`search?q=${query}&token=${process.env.API_KEY}`)
  },
  fetchStockDetails(stockSymbol: string) {
    return instance.get<DetailsType>(`stock/profile2?symbol=${stockSymbol}&token=${process.env.API_KEY}`)
  },
  fetchQuote(stockSymbol: string) {
    return instance.get<QuoteType>(`quote?symbol=${stockSymbol}&token=${process.env.API_KEY}`)
  },
  fetchHistoricalData(stockSymbol: string, resolution: string, from: number, to: number) {
    return instance.get<HistoricalDataType>(`stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.API_KEY}`)
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

export type DetailsType = {
  country: string
  currency: string
  exchange: string
  ipo: string
  marketCapitalization: number
  name: string
  phone: string
  shareOutstanding: number
  ticker: string
  weburl: string
  logo: string
  finnhubIndustry: string
}

export type QuoteType = {
  c: number
  d: number
  dp: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

export type HistoricalDataType = {
  c: Array<number>
  h: Array<number>
  l: Array<number>
  o: Array<number>
  s: string
  t: Array<number>
  v: Array<number>
}
