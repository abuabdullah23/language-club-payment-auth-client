import React from 'react';

const MyEnrolledCard = ({ classItem }) => {
    const { _id, name, itemName, instructorName, image, price } = classItem;

    return (
        <div className="border rounded-md border-neutral-300 hover:border-[#009620]">

            <div className='flex flex-col justify-between h-full bg-white shadow-lg rounded-md relative text-neutral-800'>
                <div className="p-2">
                    <img className='h-40 md:h-36 w-full object-cover rounded-md' src={image} alt="Class Image" />
                </div>
                <div className='px-3 pb-3 flex flex-col items-start justify-start'>
                    <div>
                        <p className='text-xl text-neutral-600 font-semibold'>Class Name: {itemName}</p>
                        <p className='text-xl text-neutral-600 font-semibold'>Instructor Name: {instructorName}</p>
                    </div>

                    <div className='flex sm:flex lg:flex justify-between items-center gap-4'>
                        <p className='text-xl font-bold '>Price: <span className='font-semibold text-orange-500'>${price}</span> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEnrolledCard;