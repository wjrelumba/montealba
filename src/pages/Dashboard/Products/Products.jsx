import React from 'react'
import { useMedia } from '../../../contextProviders/MediaProvider'
import ItemComponent from '../../../components/ItemsComponent/ItemComponent';

const sampleFoodArray = [
    {
        item_name: 'Chili Garlic',
        price: 100,
        image_url: '/Chili_Garlic.jpg',
    },
    {
        item_name: 'Pork Sisig (Small)',
        price: 50,
        image_url: '/Pork_Sisig.jpg',
    },
    {
        item_name: 'Tofu Sisig (Small)',
        price: 50,
        image_url: '/Tofu_Sisig.jpg',
    }
];

export default function Products() {
    const isMobile = useMedia();
    
    // Mobile render
    if(isMobile){
        return (
            <div className='w-full h-[90%] p-2'>
                {/* Title Div */}
                <div className='mb-3'>
                    <h1 className='text-2xl'>Products</h1>
                </div>
                {/* Products Section */}
                <div className='h-[28.5rem] w-full flex flex-col gap-2 items-center overflow-scroll'>
                    {sampleFoodArray.map((data, index) => (
                        <ItemComponent key={index} itemDetails={data} mode={'productsMode'}/>
                    ))}
                </div>
            </div>
        )
    }
    // PC Render
    if(!isMobile){
        return (
            <div className='w-full h-[80%] p-2'>
                <div className='mb-5'>
                    <h1 className='text-2xl'>Products</h1>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                    {sampleFoodArray.map((data, index) => (
                        <ItemComponent key={index} itemDetails={data} mode={'productsMode'}/>
                    ))}
                </div>
            </div>
        )
    } 
}
