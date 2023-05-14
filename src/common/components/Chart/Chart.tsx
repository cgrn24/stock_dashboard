'use client'

import { chartConfig } from '@/common/constants/config'
import { mockHistoricalData } from '@/common/constants/mock'
import { convertUnixTimestampToDate } from '@/common/utils/date-helpers'
import { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../Card/Card'
import { ChartFilter } from '../ChartFilter/ChartFilter'

export const Chart = () => {
  const [filter, setFilter] = useState('1W')
  const [data, setData] = useState(mockHistoricalData)

  const formatData = (data: any) => {
    return data.c.map((item: any, index: any) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      }
    })
  }
  return (
    <Card>
      <ul className='flex absolute top-2 right-2 z-40'>
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item)
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
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
