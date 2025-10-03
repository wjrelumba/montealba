import React from 'react'
import { useTheme } from '../../contextProviders/ThemeProvider'

export default function ItemComponent({
    itemDetails
}) {
    const {theme} = useTheme();

  return (
    <div className={`rounded-2xl p-3 w-[20rem] h-[10rem] flex items-center gap-2 border-[2px] ${theme == 'light' ? 'border-[#182217]' : 'border-[#ffefcb]'}`}>
        <div className={`w-1/2 h-full rounded-lg p-1 ${theme == 'light' ? 'bg-[#182217]' : 'bg-[#ffefcb]'}`}>
          <img className='w-full h-full rounded-lg' src={itemDetails.image_url} alt="" />
        </div>
        <div className='w-1/2 flex flex-col h-full'>
          <div>
            <h1 className='text-xl'>{itemDetails.item_name}</h1>
          </div>
          <div className='w-full flex items-center gap-1'>
            <h1>Price:</h1>
            <h1>{itemDetails.price}</h1>
          </div>
        </div>
    </div>
  )
}
