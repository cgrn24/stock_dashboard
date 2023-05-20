import { useStore } from '@/app/store'
import { FC } from 'react'

type Props = {
  results: any
}

export const SearchResults: FC<Props> = ({ results }) => {
  const setStockSymbol = useStore((state) => state.setStockSymbol)
  return (
    <ul className='absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar'>
      {results.map((item: any) => {
        return (
          <li
            onClick={() => setStockSymbol(item.symbol)}
            key={item.symbol}
            className='cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200'
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        )
      })}
    </ul>
  )
}
