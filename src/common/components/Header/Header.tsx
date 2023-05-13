import { FC } from 'react'
import { Search } from '../Search/Search'

type Props = {
  name?: string
}

export const Header: FC<Props> = ({ name }) => {
  return (
    <>
      <div className='xl:px-32'>
        <h1 className='text-5xl'>{name}</h1>
        <Search />
      </div>
    </>
  )
}
