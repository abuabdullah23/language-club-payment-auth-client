import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GiTeacher } from 'react-icons/gi';
import InstructorsCard from '../../components/InstructorCard/SingleInstructors';

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();

    // fetch Instructors data with axios
    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await axiosSecure.get('/instructors');
        refetch();
        return res.data;
    })

    return (
        <div className='mt-16'>
            <SectionTitle
                heading={'Instructors'}
            ></SectionTitle>

            <div className='flex items-center gap-2 text-orange-600 mb-7'>
                <GiTeacher />
                <h2 className='text-xl font-semibold'>Total Instructor: {instructors.length}</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-center'>
                {
                    instructors.map(instructor => <InstructorsCard
                        key={instructor._id}
                        instructor={instructor}
                    ></InstructorsCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;