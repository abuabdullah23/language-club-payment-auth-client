import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useInstructor from "../../hooks/useInstructor";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const SingleClassCard = ({ classItem }) => {
    const { _id, name, image, instructorName, seats, price, enrolled } = classItem;

    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [, refetch] = useCart();

    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSelectClass = (id) => {
        console.log(id)
        if (user && user.email) {
            const addClass = { classId: _id, email: user.email, name, instructorName, image, price }
            axiosSecure.post('/cart', addClass)
                .then(res => {
                    console.log(res);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your Class has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        refetch(); // to update the number of cart icon
                    }
                })
        } else {
            Swal.fire({
                title: 'Warning',
                text: "Please login to select class!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            })
        }
    }

    return (
        <div className="border rounded-md border-neutral-300 hover:border-[#009620]">

            <div className={`${seats < 1
                ? 'flex flex-col justify-between h-full shadow-lg rounded-md relative text-neutral-100 bg-[#ff484b]'
                : 'flex flex-col justify-between h-full bg-white shadow-lg rounded-md relative text-neutral-800'}`}>
                <div className="p-2">
                    <img className='h-40 md:h-36 w-full object-cover rounded-md' src={image} alt="Class Image" />
                </div>
                <div className='p-3'>
                    <div className="mb-2">
                        <p className='text-xl font-semibold'>{name}</p>
                        <p><span className='font-semibold'>Instructor Name:</span> {instructorName}</p>
                    </div>

                    <hr className='my-2 border-t border-neutral-300' />

                    <div className='flex sm:flex lg:flex justify-between items-center gap-4'>
                        <p className='text-xl'>Available Seats: <span className='font-semibold'> {seats}</span> </p>

                        <p className='text-xl'>Price: $<span className='font-semibold'> {price}</span> </p>
                    </div>

                </div>
                {/* {
                    enrolled > 0
                        ? <div className="w-full text-center text-neutral-100 bg-[#084100]">
                            <p className='py-2 text-xl font-semibold'>Enrolled: {enrolled}</p>
                        </div>
                        :
                        <></>
                } */}
                <div className="w-full text-center text-neutral-100 bg-[#084100]">
                    <p className='py-2 text-xl font-semibold'>Enrolled: {enrolled}</p>
                </div>

                <div className='flex items-center rounded-b-md text-white'>
                    <button onClick={handleSelectClass}
                        disabled={isAdmin || isInstructor || seats === 0}
                        className={`${isAdmin || isInstructor || seats === 0
                            ? 'w-full py-2 px-2 text-lg font-semibold rounded-b-md bg-neutral-300'
                            : 'w-full py-2 px-2 text-lg font-semibold bg-[#118f00] rounded-b-md hover:bg-[#15b300]'}`}
                    >Select</button>

                </div>
            </div>
        </div>
    );
};

export default SingleClassCard;