import React from 'react'
import { useTheme } from '../../contextProviders/ThemeProvider'

export default function ItemComponent({
    itemDetails,
    mode,
}) {
    const {theme} = useTheme();
    
    const getSum = () => {
      var sumOfProducts = 0;
      for(let i = 0; i < itemDetails.items.length; i++){
        const priceQuantity = itemDetails.items[i].quantity * itemDetails.items[i].price;
        sumOfProducts += priceQuantity;
      };

      return (sumOfProducts);
    };

  if(mode == 'productsMode') return (
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
  );

  if(mode == 'ordersMode') return (
    <div className={`rounded-2xl p-3 w-[20rem] h-[20%] border-[2px] ${theme == 'light' ? 'border-[#182217]' : 'border-[#ffefcb]'}`}>
        <div className='w-full flex flex-col'>
          <h1 className='text-3xl w-full border-b-[2px] mb-1'>{itemDetails.owner}</h1>
          {/* Classifications */}
          <div className='w-full grid grid-cols-3 h-full'>
              <div className='w-full flex items-center gap-1'>
                <h1>Item Name</h1>
              </div>
              <div className='w-full flex items-center gap-1'>
                <h1>Quantity</h1>
              </div>
              <div className='w-full flex items-center gap-1'>
                <h1>Price</h1>
              </div>
            </div>
            {/* Actual data */}
          {itemDetails.items && itemDetails.items.map((data, index) => (
            <div key={index} className='w-full grid grid-cols-3 h-full'>
              <div>
                <h1>{data.item_name}</h1>
              </div>
              <div className='w-full flex items-center gap-1'>
                <h1>{data.quantity}</h1>
              </div>
              <div className='w-full flex items-center gap-1'>
                <h1>{(data.price * data.quantity)}</h1>
              </div>
            </div>
          ))}
          <div className='w-full grid grid-cols-3 h-full'>
            <div></div>
            <div></div>
            <div className='w-full flex items-center gap-1'>
              <h1 className='text-xl'>
                {getSum()}
              </h1>
            </div>
          </div>
        </div>
    </div>
  );
}
