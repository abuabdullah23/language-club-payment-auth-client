import React from 'react';
import './Payment.css';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../../../../components/CheckoutForm/CheckoutForm';

//  Payment publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Payment = () => {
    const item = useLoaderData();
    const { name, image } = item;
    const price = parseFloat(item.price);

    return (
        <div>
            <div className='bg-payment'>
                <div className='flex items-center justify-center'>
                    <SectionTitle
                        heading={'Payment'}
                    ></SectionTitle>
                </div>
            </div>

            <div className='flex gap-4 w-full items-center p-3 rounded-md mt-5 bg-neutral-200 text-xl font-semibold'>
                <div>
                    <img src={image} className='w-32 h-16 rounded-md object-cover border border-neutral-400' alt="Class Image" />
                </div>
                <div className='text-neutral-800'>
                    <p>Course Name: {name}</p>
                    <p>Price: ${price}</p>
                </div>
            </div>

            <div className='mt-8 md:w-4/5 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm item={item}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;