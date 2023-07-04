import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className='flex justify-center mb-10 '>
            <div className='text-center text-black rounded-t-lg w-fit bg-neutral-50 pt-3'>
                <div className='mb-3'>
                    <p className='text-[#D99904] italic'>{subHeading}</p>
                    <h2 className='text-3xl px-10 font-semibold'>{heading}</h2>
                </div>
                <hr className='border-2 border-orange-500' />

            </div>
        </div>
    );
};

export default SectionTitle;