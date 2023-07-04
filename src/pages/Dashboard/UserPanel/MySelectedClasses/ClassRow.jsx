import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ClassRow = ({ row, index, refetch }) => {
    const { _id, name, image, userEmail, price } = row;
    const [axiosSecure] = useAxiosSecure();

    const handleDeleteCart = (id) => {
        Swal.fire({
            title: 'Are you sure Delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/delete/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Successfully Deleted',
                                showConfirmButton: false,
                                timer: 1100
                            })
                            refetch();
                        }
                    })
            }
        })
    }

    return (
        < tr className='shadow-sm bg-neutral-100 hover:bg-[#ececec] hover:border-[#009620]'>
            <td className='font-bold text-xl'>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className='avatar border rounded-md p-2 bg-neutral-50'>
                        <div className="rounded-lg w-20 h-20">
                            {image && <img src={image} />}
                        </div>
                    </div>
                </div>
            </td>
            <td className='text-slate-600'>
                <p className='text-lg font-semibold'>{name}</p>
                <p>User Email: {userEmail}</p>
            </td>
            <td className='text-slate-600 text-lg'>${price}</td>
            <td className='text-center '>
                <button onClick={() => handleDeleteCart(_id)}
                    className='bg-[#f50c0c] hover:bg-[#df0808] text-white rounded-md py-3 px-3'> <FaTrashAlt /> </button>
            </td>
            <td className='text-center font-semibold'>
                <Link to={`/dashboard/payment/${_id}`}>
                    <button className='py-2 px-3 text-lg rounded-md bg-neutral-300 text-neutral-700 hover:bg-[#009620] hover:text-neutral-50'>Pay</button>
                </Link>
            </td>
        </tr >
    );
};

export default ClassRow;