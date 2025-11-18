import React from 'react'
import MagicLink from '../../components/Authentication/MagicLink'
const MagicLinkPage = () => {
  return (
    <div className='flex  justify-center items-center h-screen'>
        <div className='flex flex-col gap-6'>
        <MagicLink/>
        </div>
    </div>
  )
}

export default MagicLinkPage