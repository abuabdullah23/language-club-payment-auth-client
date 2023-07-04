import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import MyEnrolledCard from './MyEnrolledCard';

const MyEnrolledClasses = () => {

    const { user } = useAuth();

    // fetch data with axios
    const [axiosSecure] = useAxiosSecure();
    const { data: enrolledClasses = [], refetch } = useQuery([''], async () => {
        const res = await axiosSecure.get(`/payments?email=${user?.email}`)
        return res.data;
    })

    return (
        <div>
            <SectionTitle
                heading={`My Enrolled Classes: ${enrolledClasses.length}`}
            ></SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    enrolledClasses.map(classItem => <MyEnrolledCard
                        key={classItem._id}
                        classItem={classItem}
                    ></MyEnrolledCard>
                    )
                }
            </div>
        </div>
    );
};

export default MyEnrolledClasses;