import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import HistoryRow from './HistoryRow';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

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
                heading={'Payment History'}
            ></SectionTitle>


            {/* Table */}
            <div className="overflow-x-auto mt-5 rounded-xl">
                <table className="table">
                    {/* head */}
                    <thead className='text-neutral-800 text-xl'>
                        <tr className='bg-neutral-300'>
                            <th></th>
                            <th>Class Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Info</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            enrolledClasses.map((row, index) => <HistoryRow
                                key={row._id}
                                row={row}
                                index={index}
                            ></HistoryRow>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default PaymentHistory;