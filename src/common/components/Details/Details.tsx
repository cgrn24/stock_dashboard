import { DetailsType } from '@/common/api/stock-api'
import React from 'react'
import { FC } from 'react'
import { Card } from '../Card/Card'

type Props = {
  details: DetailsType
}

export const Details: FC<Props> = ({ details }) => {
  const detailsList = {
    name: 'Name',
    country: 'Country',
    currency: 'Currency',
    exchange: 'Exchange',
    ipo: 'IPO Date',
    marketCapitalization: 'Market Capitalization',
    finnhubIndustry: 'Industry',
  }

  const convertMillionToBillion = (number: number) => {
    return (number / 1000).toFixed(2)
  }

  return (
    <Card>
      <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className='flex-1 flex justify-between items-center'>
              <span>{detailsList[item as keyof typeof detailsList]}</span>
              <span className='font-bold'>
                {item === 'marketCapitalization' ? `${convertMillionToBillion(details[item])}B` : details[item as keyof typeof detailsList]}
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
