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

  // const fetchedDetails = useQuery(['details', stockSymbol], (stockSymbol) => stockApi.fetchStockDetails(stockSymbol))

  // const fetchedOverview = useQuery(['overview', stockSymbol], (stockSymbol) => stockApi.fetchQuote(stockSymbol))

  // useEffect(() => {
  //   setStockDetails(fetchedDetails)
  //   setQuote(fetchedOverview)
  // }, [fetchedDetails, fetchedOverview])

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await stockApi.fetchStockDetails(stockSymbol)
        setStockDetails(result.data)
      } catch (error) {
        setStockDetails({})
        console.log(error)
      }
    }

    const updateStockOverview = async () => {
      try {
        const result = await stockApi.fetchQuote(stockSymbol)
        setQuote(result.data)
      } catch (error) {
        setQuote({})
        console.log(error)
      }
    }

    updateStockDetails()
    updateStockOverview()
  }, [stockSymbol])

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
