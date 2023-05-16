import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
  headers: {
    'X-Finnhub-Token': process.env.REACT_APP_API_KEY,
  },
})

export const stockApi = {
  searchSymbol(query: any) {
    return instance.get(`search?q=${query}`)
  },
  fetchStockDetails(stockSymbol: any) {
    return instance.get(`stock/profile2?symbol=${stockSymbol}`)
  },
  fetchQuote(stockSymbol: any) {
    return instance.get(`quote?symbol=${stockSymbol}`)
  },
  fetchHistoricalData(stockSymbol: any, resolution: any, from: any, to: any) {
    return instance.get(`stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`)
  },
}
