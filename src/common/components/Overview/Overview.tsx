import { FC } from 'react'
import { Card } from '../Card/Card'

type Props = {
  symbol: any
  price: any
  change: any
  changePercent: any
  currency: any
}

export const Overview: FC<Props> = ({ symbol, price, change, changePercent, currency }) => {
  return (
    <Card>
      <span className='absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl'>{symbol}</span>
      <div className='w-full h-full flex items-center justify-around'>
        <span className='text-2xl xl:text-4xl 2xl:text-5xl flex items-center'>
          ${price}
          <span className='text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2'>{currency}</span>
        </span>
        <span className={`text-lg xl:text-xl 2xl:text-2xl ${change > 0 ? 'text-lime-500' : 'text-red-500'}`}>
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  )
}
