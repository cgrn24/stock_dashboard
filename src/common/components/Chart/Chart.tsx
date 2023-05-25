'use client'

import { useStore } from '@/app/store'
import { HistoricalDataType, stockApi } from '@/common/api/stock-api'
import { chartConfig, DataType } from '@/common/constants/config'
import { convertDateToUnixTimestamp, convertUnixTimestampToDate, createDate } from '@/common/utils/date-helpers'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../Card/Card'
import { ChartFilter } from '../ChartFilter/ChartFilter'

export const Chart = () => {
  const [filter, setFilter] = useState<DataType>('1W')
  const [data, setData] = useState<any>([])
  const stockSymbol = useStore((state) => state.stockSymbol)

  const formatData = (data: HistoricalDataType) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      }
    })
  }
  const getNewData = () => {
    const { days, weeks, months, years } = chartConfig[filter]
    const endDate = new Date()
    const startDate = createDate(endDate, -days, -weeks, -months, -years)
    const startTimestampUnix = convertDateToUnixTimestamp(startDate)
    const endTimestampUnix = convertDateToUnixTimestamp(endDate)
    return { startTimestampUnix, endTimestampUnix }
  }

  const { data: chartData } = useQuery(['chartData', filter], {
    queryFn: async () => {
      const { startTimestampUnix, endTimestampUnix } = getNewData()
      const data = await stockApi.fetchHistoricalData(stockSymbol, chartConfig[filter].resolution, startTimestampUnix, endTimestampUnix)
      return data
    },
    onSuccess(data) {
      setData(formatData(data.data))
    },
  })
  return (
    <Card>
      <ul className='flex absolute top-2 right-2 z-40'>
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item as DataType)
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='chartColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={'rgb(199 210 254)'} stopOpacity={0.8} />
              <stop offset='95%' stopColor={'rgb(199 210 254)'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip />
          <Area type='monotone' dataKey='value' stroke='#312e81' fill='url(#chartColor)' fillOpacity={1} strokeWidth={0.5} />
          <XAxis dataKey={'date'} />
          <YAxis domain={['dataMin', 'dataMax']} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
