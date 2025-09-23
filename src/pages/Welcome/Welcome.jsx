import React from 'react'

export default function Welcome() {
  return (
    <div className='w-full h-[80%] flex flex-col items-center justify-center'>
        <h1 className='text-2xl'>
            Montealba
        </h1>
        <div className='w-1/2 flex justify-center gap-2 mt-5'>
          <div>Sign Up</div>
          <div>Log In</div>
        </div>
    </div>
  )
}
