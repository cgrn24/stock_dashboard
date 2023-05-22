'use client'

import { useStore } from '@/app/store'
import { DeatailsType, stockApi } from '@/common/api/stock-api'
import { mockCompanyDetails } from '@/common/constants/mock'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Chart } from '../Chart/Chart'
import { Details } from '../Details/Details'
import { Header } from '../Header/Header'
import { Overview } from '../Overview/Overview'

export const Dashboard = () => {
  const stockSymbol = useStore((state) => state.stockSymbol)

  const [stockDetails, setStockDetails] = useState<any>({})

  const [quote, setQuote] = useState<any>({})

  const { data: fetchedDetails } = useQuery(['details', stockSymbol], () => stockApi.fetchStockDetails(stockSymbol), {
    onSuccess(data) {
      setStockDetails(data.data)
    },
  })

  const { data: fetchedQuote } = useQuery(['overview', stockSymbol], () => stockApi.fetchQuote(stockSymbol), {
    onSuccess(data) {
      setQuote(data.data)
    },
  })

  return (
    <div className='h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 front-quicksand bg-neutral-100'>
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={stockDetails.name} />
      </div>
      <div className='md:col-span-2 row-span-4'>
        <Chart />
      </div>
      <div>
        <Overview symbol={stockSymbol} price={quote.pc} change={quote.d} changePercent={quote.dp} currency={stockDetails.currency} />
      </div>
      <div className='row-span-2 xl:row-span-3'>
        <Details details={stockDetails} />
      </div>
    </div>
  )
}
