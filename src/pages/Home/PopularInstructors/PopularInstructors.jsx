import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import InstructorsCard from '../../../components/InstructorCard/SingleInstructors';
import { Link } from 'react-router-dom';
import SubmitButton from '../../../components/Buttons/SubmitButton';

const PopularInstructors = () => {
    const [axiosSecure] = useAxiosSecure();

    // fetch data with axios
    const { data: instructors = [], refetch } = useQuery(['instructor'], async () => {
        const res = await axiosSecure.get('/instructors/popular')
        return res.data;
    })

    return (
        <div className='mt-16 lg:w-5/6 mx-auto'>
            <SectionTitle
                heading={'Popular Instructors'}
            ></SectionTitle>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
                {
                    instructors.slice(0, 6).map(instructor => <InstructorsCard
                        key={instructor._id}
                        instructor={instructor}
                    ></InstructorsCard>
                    )
                }
            </div>

            {
                instructors.length > 6 ?
                    <Link to='/instructors'>
                        <SubmitButton
                            buttonText={'Show All Instructors'}
                        ></SubmitButton>
                    </Link>
                    :
                    <></>
            }
        </div>
    );
};

export default PopularInstructors;