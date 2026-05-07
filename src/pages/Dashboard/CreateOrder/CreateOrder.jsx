import React, { useEffect, useState } from 'react'
import { useUser } from '../../../contextProviders/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../contextProviders/MediaProvider';

const sampleItemsArray = [
    {
        item_name: 'Chili Garlic',
        price: 120,
        image_url: '/Chili_Garlic.jpg',
        quantity: 0,
        variations: null,
    },
    {
        item_name: 'Pork Sisig',
        price: null,
        image_url: '/Pork_Sisig.jpg',
        quantity: null,
        variations: [
          {
            variation: 'Small',
            price: 60,
            quantity: 0,
          },
          {
            variation: 'Big',
            price: 120,
            quantity: 0,
          },
        ],
    },
    {
        item_name: 'Tofu Sisig',
        price: null,
        image_url: '/Tofu_Sisig.jpg',
        quantity: 0,
        variations: [
          {
            variation: 'Small',
            price: 60,
            quantity: 0,
          },
          {
            variation: 'Big',
            price: 120,
            quantity: 0,
          },
        ],
    },
];

export default function CreateOrder() {
  // Contexts
  const {signedIn} = useUser();
  const navigate = useNavigate();
  const isMobile = useMedia();

  // States
  const [sampleItems, setSampleItems] = useState(sampleItemsArray);
  const [totalValue, setTotalValue] = useState(0);

  // Quantity validator, do not allow negative numbers
  const quantityHandler = (index, method, variation = null) => {
    console.log(index);
    setSampleItems(prev =>
      prev.map((item, i) => {

        // NOT TARGET ITEM
        if (i !== index) return item;

        // Without Variations
        if (item.variations === null) {
          console.log('No Variations');
          const updatedQuantity =
            method === "add"
              ? item.quantity + 1
              : Math.max(0, item.quantity - 1);

          return {
            ...item,
            quantity: updatedQuantity
          };
        }

        // With Variations
        const updatedVariations =
          item.variations.map(v => {
            console.log(`${variation} triggered`);
            // NOT TARGET VARIATION
            if (v.variation !== variation) {
              return v;
            }

            // TARGET VARIATION
            const updatedQuantity =
              method === "add"
                ? v.quantity + 1
                : Math.max(0, v.quantity - 1);

            return {
              ...v,
              quantity: updatedQuantity
            };
          });

        return {
          ...item,
          variations: updatedVariations
        };

      })
    );
  };

  // Handle the total value amount of the order
  const handleTotalValue = () => {
    var totalAmount = 0;
    if(sampleItems){
      for(var i = 0; i < sampleItems.length; i++){
        if(sampleItems[i].variations === null){
          const amountPerItem = sampleItems[i].quantity * sampleItems[i].price;
          totalAmount += amountPerItem;
        }
        else{
          for(var inner = 0; inner < sampleItems[i].variations.length; inner++){
            const amountPerItem = sampleItems[i].variations[inner].quantity * sampleItems[i].variations[inner].price;
            totalAmount += amountPerItem;
          }
        }
      }
    }
    setTotalValue(totalAmount);
  };
  
  useEffect(() => {
    if(!signedIn){
        navigate('/');
    };
  },[signedIn]);

  useEffect(() => {
    handleTotalValue();
    console.log(sampleItems); 
  },[sampleItems])
  
  // PC Render
  if(!isMobile)return (
    <div className="p-2">
      <h1 className="text-2xl mb-5">Create Order</h1>
      <div className="flex flex-col px-2 py-5">
        {/* Customer name and Total */}
        <div className="w-full grid grid-cols-2 items-center gap-3">
          {/* Customer name */}
          <div className="flex items-center gap-2 mb-5">
            <label className="text-xl" htmlFor="name">Customer: </label>
            <input className="w-full rounded-xl px-2 py-1" type="text" />
          </div>
          {/* Total */}
          <div className="flex items-center gap-2 mb-5">
            <label className="text-xl" htmlFor="name">Total: </label>
            <div className="py-1 px-2 text-center">
              <h1 className="text-xl">{totalValue} PHP</h1>
            </div>
          </div>
        </div>
        {/* Items for order creation */}
        <div className="grid grid-cols-4 gap-2">
          {/* Map out all items */}
          {sampleItems.map((data, index) => (
            // Item cards
            <div key={index} className="border-2 flex flex-col rounded-lg p-2">
              <div className="border-b-2 mb-3 pb-1 grid grid-cols-2">
                <div className="flex w-full h-full">
                  <h1 className="text-xl">{data.item_name}</h1>
                </div>
                <div className="flex w-full h-full justify-end">
                  <div className="border-2 rounded-md w-[1.5rem] h-[1.5rem] flex items-center justify-center">
                    {data.variations === null ? ( // If Variations does not exist run this
                      <>
                        {(data.quantity > 0) && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        )}
                      </>
                    ) : ( // If there are variations run this instead
                      <>
                        {(data.variations[0].quantity > 0 || data.variations[1].quantity > 0) && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Image, Price, and Options */}
              <div className="grid grid-cols-3 gap-2 w-full h-full">
                <div className="w-full border-[0.75rem] rounded-xl overflow-clip col-span-1">
                  <div className="w-full h-full">
                    <img src={data.image_url} alt="" className="w-full h-full"/>
                  </div>
                </div>
                {/* Price, and Options */}
                <div className="flex flex-col w-full col-span-2">
                  {data.variations ? (
                    // With Variations
                    <>
                      {(data.variations).map((variationData, indexChild) => ( // Map out the variations
                        <div key={indexChild}>
                          <h1 className="text-lg">{variationData.variation}</h1>
                          <h1>Price: {variationData.price}</h1>
                          <div className="flex gap-2 items-center">
                            <h1>Quantity:</h1>
                            {/* Subtract Button */}
                            <button onClick={() => quantityHandler(index, "subtract", variationData.variation)} className={`p-1 rounded-lg border-2`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                            <input className="rounded-lg px-2 p-1 w-full text-center" type="text" value={variationData.quantity} readonly/>
                            {/* Add Button */}
                            <button onClick={() => quantityHandler(index, "add", variationData.variation)} className={`p-1 rounded-lg border-2`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    // Without Variations
                    <>
                      <h1>Price: {data.price}</h1>
                      <div className="flex gap-2 items-center">
                        <h1>Quantity:</h1>
                        {/* Subtract Button */}
                        <button onClick={() => quantityHandler(index, "subtract")} className={`p-1 rounded-lg border-2`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <input className="rounded-lg px-2 p-1 w-full text-center" type="text" value={data.quantity} readonly/>
                        {/* Add Button */}
                        <button onClick={() => quantityHandler(index, "add")} className={`p-1 rounded-lg border-2`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if(isMobile)return (
    <div className="p-2">
      <h1 className="text-2xl mb-5">Create Order</h1>
      <div className="flex flex-col p-2 rounded-2xl border-2">
        <div className="flex flex-col gap-2">
          {/* Map out all items */}
          {sampleItems.map((data, index) => (
            <div key="index" className="border-2 flex flex-col rounded-lg p-2 gap-2">
              <div className="border-b-2 mb-3 pb-1 grid grid-cols-2">
                <div className="flex w-full h-full">
                  <h1 className="text-xl">{data.item_name}</h1>
                </div>
                <div className="flex w-full h-full justify-end">
                  <input type="checkbox" />
                </div>
              </div>
              <div className="w-[10rem] h-[10rem] rounded-xl overflow-clip">
                <img src={data.image_url} alt="" className=""/>
              </div>
              <h1>Price: {data.price}</h1>
              <div className="flex gap-2 items-center">
                <h1>Quantity:</h1>
                <input className="rounded-lg px-2 p-1 w-[4rem] text-center" type="number" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}