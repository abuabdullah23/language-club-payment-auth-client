import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageSingleClass = ({ classItem, refetch }) => {
    const { _id, name, image, instructorName, email, seats, status, price, enrolled } = classItem;

    const [axiosSecure] = useAxiosSecure();
    // Approve class method by Admin
    const handleApproveClass = (id) => {
        Swal.fire({
            title: 'Are you sure to Approve this class?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/classes/approve/${_id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `"${name}" class has been Approved`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    // Deny class method by Admin
    const handleDenyClass = (id) => {
        Swal.fire({
            title: 'Are you sure to Deny this class?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deny!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/classes/deny/${_id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `"${name}" class has been Denied`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    // Delete class method by Admin
    const handleDeleteClass = (id) => {
        Swal.fire({
            title: 'Are you sure to Delete this class?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009620',
            cancelButtonColor: '#ff0000',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${_id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `"${name}" class has been Deleted`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    return (
        <div>
            <div className='flex flex-col justify-between h-full border border-neutral-300 hover:border-[#009620] rounded-md relative bg-neutral-100'>
                <button onClick={() => handleDeleteClass(_id)} className='absolute top-3 right-3 p-3 text-white rounded-md bg-[#ff000098] hover:bg-[#ff0000]'> <FaTrashAlt /> </button>
                <div>
                    <img className='h-40 md:h-36 w-full object-cover rounded-t-md' src={image} alt="Class Image" />
                </div>
                <div className='p-3 text-neutral-800'>
                    <p className='text-2xl font-bold mb-2'>{name}</p>
                    <p><span className='font-semibold'>Instructor Name:</span> {instructorName}</p>
                    <p><span className='font-semibold'>Instructor Email:</span> {email}</p>
                    <hr className='my-2 border-t border-neutral-300' />

                    <div className='flex sm:flex lg:flex justify-between items-center gap-4'>
                        <p className='text-xl'>Available Seats: <span className='font-semibold'> {seats}</span> </p>

                        <p className='text-xl'>Price: $<span className='font-semibold'> {price}</span> </p>
                    </div>

                    <div className='flex sm:flex lg:flex justify-between items-center gap-4'>
                        <p className='text-xl my-2 font-bold'>Status: <span className={`${status === 'Pending' ? 'text-[#ff7b00]' : status === 'Denied' ? 'text-[#FF0004]' : 'text-[#009620]'}`}>{status}</span> </p>

                        {
                            status === 'Approved'
                                ? <p className='text-xl'>Enrolled Students: <span className='font-semibold'> {enrolled ? enrolled : '0'}</span> </p>
                                : <></>
                        }
                    </div>
                </div>
                <div className='flex items-center rounded-b-md text-white'>
                    <div className='flex items-center w-1/2'>
                        <button onClick={() => handleApproveClass(_id)}
                            disabled={status === 'Denied' || status === 'Approved'}

                            className={`${status === 'Denied' || status === 'Approved' ? 'w-full py-2 px-2 bg-[#5cc272] rounded-bl-md' : 'w-full py-2 px-2 bg-[#009620] hover:bg-[#11af34] rounded-bl-md'}`}>Approve</button>

                        <button onClick={() => handleDenyClass(_id)}
                            disabled={status === 'Denied' || status === 'Approved'}
                            className={`${status === 'Denied' || status === 'Approved' ? 'w-full py-2 px-2 bg-[#f87275]' : 'w-full py-2 px-2 bg-[#FF0004] hover:bg-[#fc2326]'}`}>Deny</button>
                    </div>

                    <Link to={`/dashboard/admin-feedback/${_id}`} className='w-1/2 text-center py-2 px-2 bg-[#4d4d4d] hover:bg-[#686868] rounded-br-md'><button>Send Feedback</button>
                    </Link>

                </div>
            </div>
        </div >
    );
};

export default ManageSingleClass;