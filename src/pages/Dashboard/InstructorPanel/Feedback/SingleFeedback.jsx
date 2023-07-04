import React from 'react';

const SingleFeedback = ({ fb }) => {
    const { name, image, feedback, status, price } = fb;
    return (
        <div>
            <div className='flex flex-col justify-between h-full border border-neutral-300 hover:border-[#009620] rounded-md bg-neutral-100'>
                <div>
                    <img className='h-40 md:h-36 w-full object-cover rounded-t-md' src={image} alt="Class Image" />
                </div>
                <div className='p-3 text-neutral-500'>
                    <p className='text-lg font-bold'>{name}</p>

                    <div className='flex sm:flex lg:flex justify-between items-center gap-4'>
                        <p className='text-lg my-2 font-semibold'>Status: <span className={`${status === 'Pending' ? 'text-[#ff7b00]' : status === 'Denied' ? 'text-[#FF0004]' : 'text-[#009620]'}`}> {status}</span> </p>

                        <p className='text-xl'>Price: $<span className='font-semibold'> {price}</span> </p>
                    </div>
                </div>
                <hr className='border-t border-neutral-300' />

                <div className='text-neutral-700 p-3'>
                    <p className={`${status === 'Denied' ? 'text-[#FF0004] text-lg font-bold underline underline-offset-4 text-center mb-2' : 'text-[#009620] text-lg font-bold underline underline-offset-4 text-center mb-2'}`}
                    >Admin Feedback:</p>

                    <p className='text-lg'>{feedback}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleFeedback;