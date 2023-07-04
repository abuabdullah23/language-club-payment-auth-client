import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SingleUser from './SingleUser';
import { FaUser } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { LiaUserCheckSolid } from 'react-icons/lia';
import { PiUsers } from 'react-icons/pi';

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })

    // Admin
    const admin = users.filter(user => user.role === 'admin');
    // Instructor
    const instructor = users.filter(user => user.role === 'instructor');
    // User
    const onlyUser = users.filter(user => user?.role !== 'admin' && user?.role !== 'instructor');

    return (
        <div>
            <SectionTitle
                heading={'Manage Users'}
            ></SectionTitle>

            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 py-2 px-4 rounded-md text-lg font-semibold bg-neutral-100'>
                <div className='flex items-center gap-2'>
                    <PiUsers className='w-6 h-6'/>
                    <h2> Total Users: {users.length}</h2>
                </div>
                <div className='flex items-center gap-2 text-green-600'>
                    <MdAdminPanelSettings  className='w-6 h-6'/>
                    <h2>Admin: {admin.length}</h2>
                </div>
                <div className='flex items-center gap-2 text-orange-500'>
                    <GiTeacher  className='w-6 h-6'/>
                    <h2>Instructor: {instructor.length}</h2>
                </div>
                <div className='flex items-center gap-2 text-neutral-500'>
                    <LiaUserCheckSolid className='w-6 h-6'/>
                    <h2>Only User: {onlyUser.length}</h2>
                </div>
            </div>

            <div className='bg-white mb-10 rounded-lg'>
                {/* Table */}
                <div className="overflow-x-auto mt-5 rounded-t-xl">
                    <table className="table">
                        {/* head */}
                        <thead className='text-black text-xl font-thin'>
                            <tr className='bg-neutral-300'>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Instructor</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Single User */}
                            {
                                users.map((user, index) => <SingleUser
                                    key={user._id}
                                    user={user}
                                    index={index}
                                    refetch={refetch}
                                ></SingleUser>)
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default ManageUsers;