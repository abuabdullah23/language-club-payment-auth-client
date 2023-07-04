import React, { useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import BackButton from '../../../../components/BackButton/BackButton';
import { useLoaderData } from 'react-router-dom';
import SubmitButton from '../../../../components/Buttons/SubmitButton';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateClassInfo = () => {
    const displayClass = useLoaderData();
    const { _id, image, name, seats, price, status, feedback } = displayClass;
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const handleUpdateClass = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const availableSeats = form.availableSeats.value;
        const price = form.price.value;
        const updateClass = {
            name: className,
            seats: parseInt(availableSeats),
            price: parseInt(price),
            status: "Pending"
        }
        setLoading(true);
        axiosSecure.put(`/class/update/${_id}`, updateClass)
            .then(res => {
                form.reset('');
                console.log(res)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Done! Successfully Updated this Class',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setLoading(false);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Not Updated!',
                        text: `Please change value of this class information!`,
                        confirmButtonText: 'Ok'
                    })
                    setLoading(false);
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}, Try Again`
                })
                setLoading(false);
            })
    }

    return (
        <div>
            <SectionTitle
                heading={'Update Class Information'}
            ></SectionTitle>

            <div className='md:flex gap-8 items-center mb-5'>
                <BackButton />
                <div className='md:flex items-center gap-4 border border-neutral-300 p-2 rounded-md text-lg mb-5 w-full bg-neutral-100'>
                    <img src={image} alt="Class Image" className='rounded-md w-full md:w-1/3 h-20 object-cover border' />
                    <div className='w-full'>
                        <h2 className='text-[#464646] col-span-3'> <span className='font-semibold'>Class Name:</span> {name}</h2>

                        <div className='flex gap-5 items-center justify-between'>
                            <h2 className='text-[#000000]'><strong>Status:</strong> <span className={`${status === 'Pending' ? 'text-[#ff7b00]' : status === 'Denied' ? 'text-[#FF0004]' : 'text-[#009620]'}`}>{status}</span></h2>
                        </div>

                        {
                            feedback !== "" ? <p> <span className='font-semibold'> Feedback: </span> {feedback ? feedback : ""}</p> : <></>
                        }
                    </div>
                </div>
            </div>

            <div>
                <form onSubmit={handleUpdateClass}>
                    {/* Row 1 : Class Name */}
                    <div>
                        <p className='mb-1'>Class Name</p>
                        <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                            required type="text"
                            name="className" id="className"
                            defaultValue={name} />
                    </div>

                    {/* Row 2 : Available Seats and Price */}
                    <div className='md:flex gap-4'>
                        <div className='w-full'>
                            <p className='mb-1'>Available Seats</p>
                            <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                required type="number"
                                name="availableSeats" id="availableSeats"
                                defaultValue={seats} />
                        </div>
                        <div className='w-full'>
                            <p className='mb-1'> $ Price</p>
                            <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                required type="number"
                                name="price" id="price"
                                defaultValue={price} />
                        </div>
                    </div>



                    {loading ?
                        <SubmitButton
                            buttonText={<><span className="loading loading-spinner text-orange-600"></span></>}
                        ></SubmitButton>
                        :
                        <SubmitButton
                            buttonText={'Update Class'}
                        ></SubmitButton>
                    }

                </form>
            </div>


        </div>
    );
};

export default UpdateClassInfo;