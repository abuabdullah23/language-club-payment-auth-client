import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    // handle back 
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <>
            <button onClick={handleBack} className='mb-3 p-2 rounded-full bg-neutral-400 hover:bg-neutral-300'><FaArrowLeft /></button>
        </>
    );
};

export default BackButton;