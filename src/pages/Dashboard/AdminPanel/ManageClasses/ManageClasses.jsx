import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ManageSingleClass from './ManageSingleClass';

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data;
    })

    const approvedClass = classes.filter(approved => approved.status === 'Approved');
    const deniedClass = classes.filter(denied => denied.status === 'Denied');
    const pendingClass = classes.filter(pending => pending.status === 'Pending');

    return (
        <div>
            <SectionTitle
                heading={'Manage Classes'}
            ></SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border border-neutral-300 py-2 px-5 rounded-md text-lg font-semibold mb-5 bg-neutral-100'>
                <h2>Total Class: {classes.length}</h2>
                <h2 className='text-[#ff7b00]'>Pending Class: {pendingClass.length}</h2>
                <h2 className='text-[#009620]'>Approved Class: {approvedClass.length}</h2>
                <h2 className='text-[#FF0004]'>Denied Class: {deniedClass.length}</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {
                    classes.map(classItem => <ManageSingleClass
                        key={classItem._id}
                        classItem={classItem}
                        refetch={refetch}
                    ></ManageSingleClass>
                    )
                }
            </div>
        </div>
    );
};

export default ManageClasses;