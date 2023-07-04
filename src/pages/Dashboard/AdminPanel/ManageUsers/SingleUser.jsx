import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAdmin from '../../../../hooks/useAdmin';

const SingleUser = ({ user, refetch, index }) => {
    const { _id, photo, name, email } = user;
    const [axiosSecure] = useAxiosSecure();

    // TODO: make dynamic for admin delete button
    const [isAdmin] = useAdmin();

    // handle Make Admin
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure to Make Admin?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${_id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `"${user.name}" has been Admin`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    // handle Make Instructor
    const handleMakeInstructor = (id) => {
        Swal.fire({
            title: 'Are you sure to Make Instructor?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Instructor!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/instructor/${_id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `"${user.name}" has been Instructor`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    // handle delete user
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure to Delete Admin?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Successfully Deleted',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `Don't Deleted`,
                            })
                        }
                    })
            }
        })
    }

    return (
        <tr className='shadow-sm hover:bg-[#ececec] hover:border-[#009620]'>
            <td className='font-bold text-xl'>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className='avatar border rounded-sm p-1 bg-neutral-50'>
                        <div className="rounded-sm w-10 h-10">
                            {photo && <img src={photo} />}
                        </div>
                    </div>
                </div>
            </td>
            <td className='text-slate-600'>
                <p className='text-lg font-semibold'>{name}</p>
                <p>User Email: {email}</p>
            </td>

            <td className='text-center'>
                {
                    user.role === 'instructor' ?
                        <span className='py-2 px-3 rounded-md bg-orange-500 text-white font-semibold'>Instructor</span>
                        :
                        <button onClick={() => handleMakeInstructor(_id)} className='py-2 px-3 rounded-md bg-neutral-200 hover:bg-neutral-300'>Make Instructor</button>
                }
            </td>

            <td className='text-center'>
                {
                    user.role === 'admin' ?
                        <span className='py-2 px-3 rounded-md bg-green-500 text-white font-semibold'>Admin</span>
                        :
                        <button onClick={() => handleMakeAdmin(_id)} className='py-2 px-3 rounded-md bg-neutral-200 hover:bg-neutral-300'>Make Admin</button>
                }
            </td>

            <td className='text-center'>
                <button onClick={() => handleDeleteUser(_id)} className='bg-[#e00000] hover:bg-[#b90303] text-white rounded-md py-3 px-3'> <FaTrashAlt className='w-4 h-4' /> </button>
            </td>
        </tr>
    );
};

export default SingleUser;