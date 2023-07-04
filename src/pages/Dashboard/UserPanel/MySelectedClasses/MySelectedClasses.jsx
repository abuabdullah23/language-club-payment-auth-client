import React from 'react';
import useCart from '../../../../hooks/useCart';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import ClassRow from './ClassRow';

const MySelectedClasses = () => {
    const [carts, refetch] = useCart();

    return (
        <div>
            <SectionTitle
                heading={'My Selected Classes'}
            ></SectionTitle>

            <div className='rounded-lg'>
                <div className='flex items-center justify-between gap-5 font-semibold'>
                    <h2 className='text-xl'>My Selected Classes : {carts.length}</h2>
                    {/* <h2 className='text-3xl'>Total Price: ${totalPrice}</h2> */}
                </div>

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
                                <th>Action</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {
                                carts.map((row, index) => <ClassRow
                                    key={row._id}
                                    row={row}
                                    index={index}
                                    refetch={refetch}
                                ></ClassRow>)
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default MySelectedClasses;