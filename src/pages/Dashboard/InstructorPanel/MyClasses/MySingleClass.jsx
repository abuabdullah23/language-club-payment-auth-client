import React from 'react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MySingleClass = ({ singleClass, refetch }) => {
    const { _id, name, image, seats, status, price, enrolled } = singleClass;

    const [axiosSecure] = useAxiosSecure();

    // Delete class method by Instructor
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
                axiosSecure.delete(`/classes/delete/byInstructor/${_id}`)
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
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error.message}`
                        })
                    })
            }
        })
    }

    // handle update class for instructor
    const navigate = useNavigate();
    const handleGoForUpdate = () => {
        navigate(`/dashboard/update-class/${_id}`)
    }

    return (
        <div>
            <div className='flex flex-col justify-between h-full border border-neutral-300 hover:border-[#009620] rounded-md bg-neutral-100'>
                <div>
                    <img className='h-40 md:h-36 w-full object-cover rounded-t-md' src={image} alt="Class Image" />
                </div>
                <div className='p-3 text-neutral-800'>
                    <p className='text-2xl font-bold mb-2'>{name}</p>
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
                    <button onClick={handleGoForUpdate}
                        disabled={status === 'Approved'}
                        className={`${status === 'Approved'
                            ? 'flex gap-2 items-center justify-center w-full py-2 px-2 bg-[#5cc272] rounded-bl-md'
                            : 'flex gap-2 items-center justify-center w-full py-2 px-2 bg-[#009620] hover:bg-[#11af34] rounded-bl-md'
                            }`}>
                        <FaPenAlt />
                        <p>Update</p>
                    </button>

                    <button onClick={() => handleDeleteClass(_id)}
                        disabled={status === 'Approved'}
                        className={`${status === 'Approved'
                            ? 'flex gap-2 items-center justify-center w-full py-2 px-2 bg-[#ff9a9c] rounded-br-md'
                            : 'flex gap-2 items-center justify-center w-full py-2 px-2 bg-[#FF0004] hover:bg-[#ff3a3d] rounded-br-md'
                            }`}>
                        <FaTrashAlt />
                        <p>Delete</p>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MySingleClass;