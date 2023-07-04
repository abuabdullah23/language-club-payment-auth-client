import React from 'react';
import ActiveLink from '../../../components/ActiveLink/ActiveLink';
import { Link } from 'react-router-dom';
import { SiGoogleclassroom } from "react-icons/si";
import Container from '../../../components/Container/Container';
import logo from '../../../assets/images/Logo/logo.png'
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAdmin from '../../../hooks/useAdmin';
import useInstructor from '../../../hooks/useInstructor';
import useCart from '../../../hooks/useCart';
import LightDarkSwap from '../../../components/Theme/LightDarkSwap';
const Navbar = () => {
    const { user, logOut } = useAuth();
    const [carts] = useCart();

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Log Out!',
                    text: 'Successfully Log Out!'
                })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ooops!',
                            text: `${error.message}`
                        })
                    })
            })
    }

    const navOptions =
        <div className='md:flex items-center'>
            <li><ActiveLink to="/">Home</ActiveLink></li>
            <li><ActiveLink to="/instructors">Instructors</ActiveLink></li>
            <li><ActiveLink to="/classes">Classes</ActiveLink></li>
            {
                user && <li><ActiveLink to={
                    isAdmin ? '/dashboard/manage-classes'
                        : user && isInstructor
                            ? '/dashboard/add-class'
                            : user ? '/dashboard/my-selected-classes'
                                : '/'}>Dashboard</ActiveLink></li>
            }
            {
                isAdmin || isInstructor ? <></> :
                    <li><Link to='/dashboard/my-selected-classes'>
                        <div className="indicator">
                            <span className="indicator-item badge badge-neutral text-white">{carts?.length || 0}</span>
                            <span className='flex gap-2 items-center'>
                                <SiGoogleclassroom className='w-8 h-8' />
                            </span>
                        </div>
                    </Link></li>
            }
        </div>

    return (
        <div className='w-full fixed z-10 bg-white shadow-md'>
            <div className='py-4 border-b[1px]'>
                <Container>
                    <div className='flex items-center justify-between text-neutral-600'>
                        <div className="navbar-start">
                            <Link to="/" className='hidden md:block m-0'>
                                <img src={logo} className='h-10 w-fit' alt="Logo Image" />
                            </Link>
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden m-0 p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content shadow bg-neutral-300 rounded-box w-52">
                                    {navOptions}
                                </ul>
                            </div>
                        </div>

                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 text-lg font-semibold">
                                {navOptions}
                            </ul>
                        </div>

                        <div className="navbar-end md:flex gap-3 text-lg font-semibold">
                            {
                                user
                                    ? <>
                                        <div className='flex items-center gap-3 justify-end'>
                                            <LightDarkSwap />
                                            <button onClick={handleLogOut} className='hover:bg-neutral-200 hover:text-black py-2 px-3 rounded-md'>Log Out</button>

                                            <img className='w-10 h-10 rounded-full border object-cover cursor-pointer' src={user?.photoURL ? user?.photoURL : ''} title={user?.displayName ? user?.displayName : user.email} alt={user?.displayName ? user?.displayName : user?.email} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='flex items-center gap-3'>
                                            <LightDarkSwap/>
                                            <ActiveLink className='hover:bg-neutral-200 hover:text-black py-2 px-3 rounded-md' to="/login">Login</ActiveLink>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;