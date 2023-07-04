import React, { useState } from 'react';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Login = () => {
    const { loading, setLoading, signIn } = useAuth();
    const [show, setShow] = useState(false);

    // redirect after login to target page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Welcome! Successfully Login',
                    showConfirmButton: false,
                    timer: 1000
                })
                navigate(from, { replace: true })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`
                })
                setLoading(false)
            })
    };

    return (
        <div className='flex justify-center mt-10'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 w-full lg:w-2/6'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                </div>
                <div className='relative bg-orange-500 rounded-full mb-5'>
                    <div>
                        <button className='py-2 px-4 w-1/2 text-lg font-semibold rounded-full text-white'>Login</button>
                    </div>
                    <Link to='/signUp'><button className='py-2 px-4 w-1/2 text-lg font-semibold rounded-full absolute right-0 top-0 bg-white text-orange-500 hover:bg-neutral-900'>Sign Up</button></Link>
                </div>
                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
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
                                <label className='text-sm mb-2'>Password</label>
                            </div>
                            <input
                                name='password'
                                id='password'
                                required
                                type={show ? 'text' : 'password'}
                                {...register("password")}
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                            />
                            <div className='flex items-center gap-3 mt-2'>
                                <input onClick={() => setShow(!show)}
                                    className='w-5 h-5'
                                    type="checkbox"></input>
                                <p>{show ? 'Hide Password' : 'Show Password'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-orange-500 hover:bg-orange-600 w-full rounded-md py-3 text-white'
                        >
                            {
                                loading ? <span className="loading loading-spinner loading-md"></span> : 'Login'
                            }

                        </button>
                    </div>
                </form>
                <div className="divider">or</div>
                <SocialLogin />
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link
                        to='/signUp'
                        className='hover:underline hover:text-orange-500 text-gray-600'
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;