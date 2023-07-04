import React, { useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../../hooks/useAuth';
import SubmitButton from '../../../../components/Buttons/SubmitButton';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const availableSeats = form.availableSeats.value;
        const price = form.price.value;

        // image upload method
        const image = event.target.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Secret_Key}`

        setLoading(true);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const photo = imgData.data.display_url;
                // post in mongodb
                const addNewClassInfo = {
                    name: className,
                    image: photo,
                    instructorName,
                    email: instructorEmail,
                    seats: parseInt(availableSeats),
                    price: parseInt(price),
                    status: "Pending",
                    enrolled: 0
                }
                axiosSecure.post('/classes', addNewClassInfo)
                    .then(res => {
                        form.reset('');
                        // console.log(res)
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Done! Successfully Added a New Class',
                                showConfirmButton: false,
                                timer: 1500
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
            })
    }

    return (
        <div>
            <SectionTitle
                heading={"Add A New Class"}
            ></SectionTitle>

            <div>
                <div>
                    <form onSubmit={handleAddClass} >
                        {/* Row 1 : Class Name */}
                        <div>
                            <p className='mb-1'>Class Name</p>
                            <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                required type="text"
                                name="className" id="className"
                                placeholder='Type class name' />
                        </div>

                        {/* Row 2 : Instructor Name and Email*/}
                        <div className='md:flex gap-4'>
                            <div className='w-full'>
                                <p className='mb-1'>Instructor Name</p>
                                <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                    required type="text" readOnly
                                    name="instructorName" id="instructorName"
                                    defaultValue={user?.displayName} />
                            </div>
                            <div className='w-full'>
                                <p className='mb-1'>Instructor Email</p>
                                <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                    required type="email" readOnly
                                    name="instructorEmail" id="instructorEmail"
                                    defaultValue={user?.email} />
                            </div>
                        </div>

                        {/* Row 3 : Available Seats and Price */}
                        <div className='md:flex gap-4'>
                            <div className='w-full'>
                                <p className='mb-1'>Available Seats</p>
                                <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                    required type="number"
                                    name="availableSeats" id="availableSeats"
                                    placeholder='Type number of available seats' />
                            </div>
                            <div className='w-full'>
                                <p className='mb-1'> $ Price</p>
                                <input className='bg-neutral-100 text-neutral-800 py-2 px-4 w-full border border-neutral-300 rounded-md mb-4'
                                    required type="number"
                                    name="price" id="price"
                                    placeholder='Type course price in $' />
                            </div>
                        </div>

                        {/* Row 4 : Image */}
                        <div>
                            <p className='mb-1'>Class Image</p>
                            <input
                                required type='file'
                                id='image' name='image'
                                accept='image/*'
                            />
                        </div>
                        {
                            loading
                                ?
                                <SubmitButton
                                    buttonText={<><span className="loading loading-spinner text-orange-600"></span></>}
                                ></SubmitButton>
                                :
                                <SubmitButton
                                    buttonText={'Add New Class'}
                                ></SubmitButton>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;