import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { PiChalkboardTeacherLight } from 'react-icons/pi';
import { GiTeacher } from 'react-icons/gi';
import { FaMicrophoneLines } from "react-icons/fa6";
import { ImBooks } from 'react-icons/im';

const OurFeatures = () => {
    return (
        <div className='mt-16'>
            <SectionTitle
                heading={'Our Features'}
            ></SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-neutral-100 text-center'>
                <div className='bg-orange-500 py-8 px-4 flex flex-col items-center'>
                    <PiChalkboardTeacherLight className='w-12 h-12' />
                    <h2 className='my-3 text-xl font-semibold'>Certified Teachers</h2>
                    <p>Expert educators empowering students to reach their full potential. Trust our certified teachers for exceptional learning experiences.</p>
                </div>
                <div className='bg-neutral-900 py-8 px-4 flex flex-col items-center'>
                    <GiTeacher className='w-12 h-12' />
                    <h2 className='my-3 text-xl font-semibold'>Special Education</h2>
                    <p>Inclusive support and tailored education for diverse learners. Discover our specialized approach to special education.</p>
                </div>
                <div className='bg-orange-500 py-8 px-4 flex flex-col items-center'>
                    <ImBooks className='w-12 h-12' />
                    <h2 className='my-3 text-xl font-semibold'>Books & Library</h2>
                    <p>Unlock endless knowledge and imagination. Explore our vast collection of books in our exceptional library.</p>
                </div>
                <div className='bg-neutral-900 py-8 px-4 flex flex-col items-center'>
                    <FaMicrophoneLines className='w-12 h-12' />
                    <h2 className='my-3 text-xl font-semibold'>Speaking Club</h2>
                    <p>Boost your speaking skills with confidence. Join our dynamic Speaking Club for interactive and impactful language courses.</p>
                </div>
            </div>
        </div>
    );
};

export default OurFeatures;