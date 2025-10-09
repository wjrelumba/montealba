import React, { useEffect } from 'react'
import { useUser } from '../../../contextProviders/UserProvider'
import { useNavigate } from 'react-router-dom';
import ItemComponent from '../../../components/ItemsComponent/ItemComponent';
import { useMedia } from '../../../contextProviders/MediaProvider';

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
]

export default function Orders() {
    const {signedIn} = useUser();
    const navigate = useNavigate();
    const isMobile = useMedia();

    // Check if user is signed in
    useEffect(() => {
        if(!signedIn){
            navigate('/');
        };
    },[signedIn]);

    // Mobile render
    if(isMobile){
        return (
            <div className='w-full h-[90%] p-2 overflow-scroll'>
                <div className='mb-3'>
                    <h1 className='text-2xl'>Orders</h1>
                </div>
                <div className='w-full flex flex-col gap-2 items-center'>
                    {sampleFoodArray.map((data, index) => (
                        <ItemComponent key={index} itemDetails={data}/>
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
                    <h1 className='text-2xl'>Orders</h1>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                    {sampleFoodArray.map((data, index) => (
                        <ItemComponent itemDetails={data}/>
                    ))}
                </div>
            </div>
        )
    } 
}
