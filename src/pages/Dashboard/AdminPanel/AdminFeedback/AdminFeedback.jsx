import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SubmitButton from '../../../../components/Buttons/SubmitButton';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import BackButton from '../../../../components/BackButton/BackButton';

const AdminFeedback = () => {
    const singleClass = useLoaderData();
    const { _id, name, price, seats, image, feedback, status } = singleClass;
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    // handle send feedback button
    const handleSendFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;

        const sendFeedback = { feedback }
        // console.log(sendFeedback);

        setLoading(true);

        // send feedback method
        axiosSecure.put(`/classes/feedback/${_id}`, sendFeedback)
            .then(res => {
                // console.log(res)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done!',
                        text: 'Successfully Send Feedback!',
                        showConfirmButton: true,
                    })
                    setLoading(false);
                } else {
                    Swal.fire({
                        title: 'Not Send Feedback!',
                        text: `Please change value of this feedback!`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    setLoading(false);
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`
                })
            })
    }

    return (
        <div>
            <SectionTitle
                heading={'Admin Feedback'}
            ></SectionTitle>
            {/* Back Button */}
            <BackButton></BackButton>

            <div className='md:flex items-center gap-4 border border-neutral-300 p-2 rounded-md text-lg font-semibold mb-5 bg-neutral-100'>
                <img src={image} alt="Class Image" className='rounded-md w-full md:w-1/3 h-20 object-cover border' />
                <div className='w-full'>
                    <h2 className='text-[#464646] col-span-3'>Class Name: {name}</h2>
                    <h2 className='text-[#009620]'>Price: ${price}</h2>

                    <div className='flex gap-5 items-center justify-between'>
                        <h2 className='text-[#000000]'>Seats: {seats}</h2>
                        <h2 className='text-[#000000]'>Status: <span className={`${status === 'Pending' ? 'text-[#ff7b00]' : status === 'Denied' ? 'text-[#FF0004]' : 'text-[#009620]'}`}>{status}</span></h2>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <form onSubmit={handleSendFeedback}>
                    <p>Write your feedback:</p>
                    <textarea className='w-full h-40 p-3 mt-2 border bg-neutral-100 text-neutral-800' name="feedback" id="feedback"
                        // required
                        defaultValue={
                            feedback
                                ? feedback
                                : 'Here type your Feedback about deny/approve this class.'} ></textarea>

                    {
                        loading
                            ?
                            <SubmitButton
                                buttonText={<><span className="loading loading-spinner text-orange-600"></span></>}
                            ></SubmitButton>
                            :
                            <SubmitButton
                                buttonText={'Send Feedback'}
                            ></SubmitButton>
                    }

                </form>
            </div>
        </div>
    );
};

export default AdminFeedback;