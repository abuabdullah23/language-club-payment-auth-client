import React from 'react';

const SubmitButton = ({ buttonText }) => {
    return (
        <div className='flex justify-center text-center mt-8'>
            <button className='py-2 px-10 rounded-md bg-neutral-300 hover:bg-neutral-700 text-black hover:text-white text-lg font-semibold w-fit'>
                {buttonText}
            </button>
        </div>
    );
};

export default SubmitButton;