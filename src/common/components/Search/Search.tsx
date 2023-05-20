'use client'

import { useState } from 'react'
import { SearchIcon, XIcon } from '@heroicons/react/solid'
import { SearchResults } from '../SearchResults/SearchResults'
import { useQuery } from '@tanstack/react-query'
import { stockApi } from '../../api/stock-api'

export const Search = () => {
  const [input, setInput] = useState('')
  const [bestMatches, setBestMatches] = useState<any>([])

  const clear = () => {
    setInput('')
    setBestMatches([])
  }

  // const { data } = useQuery(['searchSymbol', input], () => stockApi.searchSymbol(input))
  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await stockApi.searchSymbol(input)
        const result = searchResults.data.result
        setBestMatches(result)
      }
    } catch (error) {
      setBestMatches([])
      console.log(error)
    }
  }
  console.log(input)
  console.log(bestMatches)

  // const updateBestMatches = () => {
  //   setBestMatches(data?.data.result)
  // }

  return (
    <div>
      <div className='flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
        <input
          type='text'
          value={input}
          className='w-full px-4 py-2 focus:outline-none rounded-md'
          placeholder='Search stock...'
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              updateBestMatches()
            }
          }}
        />
        {input && (
          <button onClick={clear} className='m-1'>
            <XIcon className='h-4 w-4 fill-gray-500' />
          </button>
        )}
        <button
          onClick={updateBestMatches}
          className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400'
        >
          <SearchIcon className='h-4 w-4 fill-gray-100' />
        </button>
        {input && bestMatches.length > 0 ? <SearchResults results={bestMatches} /> : null}
      </div>
    </div>
  )
}
