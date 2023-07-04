import React from 'react';

const InstructorsCard = ({ instructor }) => {
    const { name, photo, email } = instructor;

    return (
        <div>
            <div className='shadow-lg text-neutral-600 bg-neutral-50 rounded-md p-3 text-center hover:scale-105 transition border border-neutral-200 hover:border hover:border-[#009620]'>
                <div className='flex justify-center mb-5'>
                    <img className='w-24 h-24 mt-4 object-cover object-top border drop-shadow rounded-full' src={photo} alt="Instructor Image" />
                </div>
                <h2 className='text-xl font-bold'>{name}</h2>
                <p>{email}</p>
                <button disabled className='w-full py-2 px-3 rounded-full bg-neutral-400 text-white mt-3'>See Classes</button>
            </div>
        </div>
    );
};

export default InstructorsCard;