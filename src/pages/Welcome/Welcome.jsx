import React from 'react'
import { useMedia } from '../../contextProviders/MediaProvider';

export default function Welcome() {
  const isMobile = useMedia();

  // Mobile Render
  if(isMobile){
    return (
      <div className='w-full h-[80%] flex flex-col items-center justify-center'>
          <h1 className='text-2xl'>
              Montealba Mobile
          </h1>
          <div className='w-1/2 flex justify-center gap-2 mt-5'>
            <div>Sign Up</div>
            <div>Log In</div>
          </div>
      </div>
    )
  }
  // PC or Tablet landscape render
  else {
    return (
      <div className='w-full h-[80%] flex flex-col items-center justify-center'>
          <h1 className='text-2xl'>
              Montealba PC
          </h1>
          <div className='w-1/2 flex justify-center gap-2 mt-5'>
            <div>Sign Up</div>
            <div>Log In</div>
          </div>
      </div>
    )
  }
}
