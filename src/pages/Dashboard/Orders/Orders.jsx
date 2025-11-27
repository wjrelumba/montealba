import React, { useEffect } from 'react'
import { useUser } from '../../../contextProviders/UserProvider'
import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../contextProviders/MediaProvider';
import ItemComponent from '../../../components/ItemsComponent/ItemComponent';

const sampleOrdersArray = [
    {
        owner: 'Billy',
        items: [
            {
                item_name: 'Chili Garlic',
                quantity: 2,
                price: 100,
            },
            {
                item_name: 'Pork Sisig',
                quantity: 4,
                price: 50,
            },
            {
                item_name: 'Laing',
                quantity: 3,
                price: 50,
            },
            {
                item_name: 'Leche Flan',
                quantity: 1,
                price: 100,
            },
            {
                item_name: 'Tofu Sisig',
                quantity: 9,
                price: 50,
            },
        ],
    },
    {
        owner: 'Monique',
        items: [
            {
                item_name: 'Chili Garlic',
                quantity: 3,
                price: 100,
            },
            {
                item_name: 'Tofu Sisig',
                quantity: 2,
                price: 50,
            },
        ],
    },
    {
        owner: 'Kristine',
        items: [
            {
                item_name: 'Chili Garlic',
                quantity: 1,
                price: 100,
            },
            {
                item_name: 'Tofu Sisig',
                quantity: 1,
                price: 50,
            },
            {
                item_name: 'Pork Sisig',
                quantity: 1,
                price: 50,
            },
        ],
    }
];

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

    if(isMobile) return (
        <>
            <div className='w-full h-full flex flex-wrap justify-center gap-2'>
                <div className='w-full px-2'>
                    <h1 className='text-3xl mb-3'>Orders</h1>
                </div>
                {sampleOrdersArray && sampleOrdersArray.map((data, index) => (
                    <ItemComponent key={index} itemDetails={data} mode={'ordersMode'} />
                ))}
            </div>
        </>
    );

    if(!isMobile) return (
        <>
            <div className='w-full h-full flex flex-wrap gap-2'>
                <div className='w-full px-2'>
                    <h1 className='text-3xl mb-3'>Orders</h1>
                </div>
                {sampleOrdersArray && sampleOrdersArray.map((data, index) => (
                    <ItemComponent key={index} itemDetails={data} mode={'ordersMode'} />
                ))}
            </div>
        </>
    );
}
