import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import MySingleClass from './MySingleClass';

const MyClasses = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: myClasses = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get(`/classes/instructor?email=${user.email}`)
        return res.data;
    })

    const approvedClass = myClasses.filter(approved => approved.status === 'Approved');
    const deniedClass = myClasses.filter(denied => denied.status === 'Denied');
    const pendingClass = myClasses.filter(pending => pending.status === 'Pending');


    return (
        <div>
            <SectionTitle
                heading={"My Classes"}
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 border border-neutral-300 py-2 px-5 rounded-md text-lg font-semibold bg-white'>
                <h2>My Total Class: {myClasses.length}</h2>
                <h2 className='text-[#ff7b00]'>Pending Class: {pendingClass.length}</h2>
                <h2 className='text-[#009620]'>Approved Class: {approvedClass.length}</h2>
                <h2 className='text-[#FF0004]'>Denied Class: {deniedClass.length}</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5'>
                {
                    myClasses.map(singleClass => <MySingleClass
                        key={singleClass._id}
                        singleClass={singleClass}
                        refetch={refetch}
                    ></MySingleClass>
                    )
                }
            </div>
        </div>
    );
};

export default MyClasses;