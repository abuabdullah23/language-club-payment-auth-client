import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ item }) => {

    const { price, _id, name, classId, instructorName, image } = item;

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const [, refetch] = useCart();

    const navigate = useNavigate();
    // console.log(clientSecret)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error);
            setCardError(error.message)
        } else {
            setCardError('')
            // console.log('Payment method', paymentMethod)
        }

        setProcessing(true);

        setSuccess('')
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            // console.log(confirmError);
        }
        console.log('payment Intent', paymentIntent);
        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            setSuccess("Your Payment Successful.")
            const payment = {
                name: user?.displayName,
                email: user?.email,
                image: image,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                status: 'Pending',
                itemId: _id,
                itemName: name,
                instructorName: instructorName
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'top-right',
                            icon: 'success',
                            title: 'Successful Your Payment',
                            showConfirmButton: false,
                            timer: 1000
                        })

                        axiosSecure.delete(`/carts/delete/${_id}`)
                            .then(res => {
                                refetch();
                                navigate('/dashboard/my-selected-classes')
                            })
                    }
                })
        }
        setProcessing(false);

        // console.log('card', card)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='mb-10'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: 'gray',
                                '::placeholder': {
                                    color: 'gray',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='md:flex gap-5 items-center mt-8'>
                    <div className='flex justify-left'>
                        <button type="submit"
                            disabled={!stripe || !clientSecret || processing}
                            className='btn btn-outline'>
                            Pay
                        </button>
                    </div>
                    {
                        cardError && <p className='text-red-500 text-xl bg-neutral-200 py-3 px-5 rounded-md mt-5 md:mt-0'>{cardError}</p>
                    }

                    {
                        success && <>
                            <p className='text-green-600 text-xl bg-neutral-200 py-3 px-5 rounded-md mt-5 md:mt-0' >Your Transaction Id: {transactionId}</p>
                        </>
                    }
                </div>
            </form>
        </>
    );
};

export default CheckoutForm;