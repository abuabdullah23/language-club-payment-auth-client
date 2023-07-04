import React from 'react';
import { Link } from 'react-router-dom';
import SubmitButton from '../components/Buttons/SubmitButton';
import { FaArrowLeft } from 'react-icons/fa6';
import errImg from '../assets/images/404/404-01.png'

const ErrorPage = () => {
    return (
        <div className='md:px-16 md:pt-32 pl-5 pt-10 pe-5 md:flex sm:flex-row-reverse gap-5 items-center justify-center'>
            <div className='w-full'>
                <img src={errImg} alt="Error Image" />
            </div>
            <div className='text-center w-full p-5 flex items-center'>
                <div>
                    <h2 className='text-7xl font-bold mb-10 text-[#ff4d4d]'>Oops!</h2>
                    <h3 className='text-3xl font-semibold mb-10'>There's Nothing Here...</h3>

                    <Link to='/'>
                        <SubmitButton
                            buttonText={<span className='flex gap-5 items-center'><FaArrowLeft/> Back To Home</span>}
                        ></SubmitButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;