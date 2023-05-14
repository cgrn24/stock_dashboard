import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Card: FC<Props> = ({ children }) => {
  return <div className='w-full h-full rounded-md relative p-8 border-2 bg-white border-neutral-200'>{children}</div>
}
