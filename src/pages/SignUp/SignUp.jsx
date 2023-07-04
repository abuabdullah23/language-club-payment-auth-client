import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { loading, setLoading, createUser, updateUserProfile } = useAuth();
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    // redirect after signUp
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const confirm = data.confirm;

        // confirm Password Method
        if (password !== confirm) {
            setError('Password not matched, Try again please!')
            return
        } else {
            setError('')
        }

        // image upload method
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Secret_Key}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const photoUrl = imgData.data.display_url;
                createUser(email, password)
                    .then(result => {
                        updateUserProfile(name, photoUrl)
                            .then(() => {
                                // ==== save user info in mongoDB ===
                                const savedUser = { name: data.name, email: data.email, photo: photoUrl }
                                fetch('http://localhost:5000/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(savedUser)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Welcome!',
                                            text: 'Successfully created your account!'
                                        })
                                        navigate(from, { replace: true })
                                        reset('');
                                    })
                            })
                            .catch(error => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: `${error.message}`
                                })
                                setLoading(false)
                            })
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error.message}`
                        })
                        setLoading(false)
                    })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}, Check your internet connection!`
                })
            })
    };

    return (
        <div className='flex justify-center mt-10'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 w-full lg:w-2/6'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                </div>
                <div className='relative bg-orange-500 rounded-full mb-5'>
                    <div>
                        <button className='py-2 px-4 w-1/2 text-lg font-semibold rounded-full text-white'>SignUp</button>
                    </div>
                    <Link to='/login'> <button className='py-2 px-4 w-1/2 text-lg font-semibold rounded-full absolute right-0 top-0 bg-white text-orange-500 hover:bg-neutral-900'>Login</button></Link>
                </div>
                {/* Sign Up Form */}
                <form onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label className='block mb-2 text-sm'>Name</label>
                            <input
                                type='name'
                                name='name'
                                id='name'
                                required
                                {...register("name")}
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>Email</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                {...register("email")}
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label className='text-sm mb-2'>Password </label>
                            </div>
                            <input
                                type={show ? 'text' : 'password'}
                                name='password'
                                id='password'
                                required
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])/
                                })}
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                            />
                            {errors.password && errors.password.type === 'required' && <span className='text-red-500 mt-2'>Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className='text-red-500 mt-2'>Length should be 6 character</span>}
                            {errors.password?.type === 'pattern' && <span className='text-red-500 mt-2'>Password must be One uppercase, one special character</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label className='text-sm mb-2'>Confirm Password </label>
                            </div>
                            <input
                                type={show ? 'text' : 'password'}
                                name='confirm'
                                id='confirm'
                                required
                                {...register("confirm")}
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                            />
                            <span className='text-red-500 mt-2'>{error}</span>
                            <div className='flex items-center gap-3 mt-2'>
                                <input onClick={() => setShow(!show)}
                                    className='w-5 h-5'
                                    type="checkbox"></input>
                                <p>{show ? 'Hide Password' : 'Show Password'}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                {...register("image")}
                                accept='image/*'
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-orange-500 hover:bg-orange-600 w-full rounded-md py-3 text-white'
                        >
                            {
                                loading ? <span className="loading loading-spinner loading-md"></span> : 'Sign UP'
                            }

                        </button>
                    </div>
                </form>
                <div className="divider">or</div>
                <SocialLogin />
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account yet?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-orange-500 text-gray-600'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;