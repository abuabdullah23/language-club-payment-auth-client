import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SingleFeedback from './SingleFeedback';

const Feedback = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: myClasses = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get(`/classes/instructor?email=${user.email}`);
        refetch();
        return res.data;
    })

    // feedback
    const feedback = myClasses.filter(feedback => feedback?.feedback)

    return (
        <div>
            <SectionTitle
                heading={'Feedback From Admin'}
            ></SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 border border-neutral-300 py-2 px-5 rounded-md text-lg font-semibold bg-neutral-100'>
                <h2>My Total Class: {myClasses.length}</h2>
                <h2 className='text-[#ff7b00]'>Feedback Class: {feedback.length}</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5'>
                {
                    feedback.map(fb => <SingleFeedback
                        key={fb._id}
                        fb={fb}
                    ></SingleFeedback>
                    )
                }
            </div>
        </div>
    );
};

export default Feedback;