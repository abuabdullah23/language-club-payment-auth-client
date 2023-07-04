import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Container from '../components/Container/Container';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import ActiveLink from '../components/ActiveLink/ActiveLink';
import useAuth from '../hooks/useAuth';
import { FaBook, FaWallet, FaHome } from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import { ImList2 } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill, PiUserDuotone, PiUserList } from "react-icons/pi";
import { MdFeedback, MdClass, MdAdminPanelSettings } from "react-icons/md";
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useCart from '../hooks/useCart';

const Dashboard = () => {
    const { user } = useAuth();


    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [carts] = useCart();

    const navItem = <>
        {/* Conditional Rendering */}
        {
            isAdmin
                ?
                <>
                    <div className='flex flex-col justify-center items-center mt-5 bg-neutral-800 text-white text-center rounded-md p-5 px-3 mb-5'>
                        <p><MdAdminPanelSettings className='w-10 h-10 mb-3' /></p>
                        <div className='  font-bold text-2xl'>
                            <p>Admin Dashboard</p>
                        </div>
                    </div>

                    <li>
                        <div className='flex items-center gap-4 justify-start tracking-normal'>
                            <ImList2 />
                            <ActiveLink to="/dashboard/manage-classes"> Manage Classes</ActiveLink>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center gap-4 justify-start tracking-normal'>
                            <PiUserList />
                            <ActiveLink to="/dashboard/manage-users">Manage Users</ActiveLink>
                        </div>
                    </li>
                </>
                : user && isInstructor ?
                    <>
                        <div className='flex flex-col justify-center items-center mt-5 bg-neutral-800 text-white text-center rounded-md p-5 px-3 mb-5'>
                            <p><GiTeacher className='w-10 h-10 mb-3' /></p>
                            <div className='  font-bold text-2xl'>
                                <p>Instructor Dashboard</p>
                            </div>
                        </div>

                        <li>
                            <div className='flex items-center gap-4 justify-start tracking-normal'>
                                <SiGoogleclassroom />
                                <ActiveLink to="/dashboard/add-class">Add A Class</ActiveLink>
                            </div>
                        </li>

                        <li>
                            <div className='flex items-center gap-4 justify-start tracking-normal'>
                                <MdClass />
                                <ActiveLink to="/dashboard/my-classes">My Classes</ActiveLink>
                            </div>
                        </li>

                        <li>
                            <div className='flex items-center gap-4 justify-start tracking-normal'>
                                <PiStudentFill />
                                <ActiveLink to="/dashboard/total-enrolled-students">Total Enrolled Students</ActiveLink>
                            </div>
                        </li>

                        <li>
                            <div className='flex items-center gap-4 justify-start tracking-normal'>
                                <MdFeedback />
                                <ActiveLink to="/dashboard/Feedback">Feedback</ActiveLink>
                            </div>
                        </li>
                    </>
                    : user ?
                        <>
                            <div className='flex flex-col justify-center items-center mt-5 bg-neutral-800 text-white text-center rounded-md p-5 px-3 mb-5'>
                                <p><PiUserDuotone className='w-10 h-10 mb-3' /></p>
                                <div className='font-bold text-2xl'>
                                    <p>Student Dashboard</p>
                                </div>
                            </div>

                            <li>
                                <div className='flex items-center gap-4 justify-start tracking-normal'>
                                    <SiGoogleclassroom />
                                    <ActiveLink to="/dashboard/my-selected-classes">My Selected Classes</ActiveLink>
                                    <span className="indicator-item badge badge-neutral text-white">{carts?.length || 0}</span>
                                </div>
                            </li>

                            <li>
                                <div className='flex items-center gap-4 justify-start tracking-normal'>
                                    <FaBook />
                                    <ActiveLink to="/dashboard/my-enrolled-classes">My Enrolled Classes</ActiveLink>
                                </div>
                            </li>

                            <li>
                                <div className='flex items-center gap-4 justify-start tracking-normal'>
                                    <FaWallet />
                                    <ActiveLink to="/dashboard/payment-history"> Payment History</ActiveLink>
                                </div>
                            </li>
                        </>
                        :
                        <> </>
        }
        <hr className='w-full my-2 border-t-2 border-neutral-300' />
        <li>
            <div className='flex items-center gap-4 justify-start tracking-normal'>
                <FaHome className='w-5 h-5' />
                <ActiveLink to="/"> Home</ActiveLink>
            </div>
        </li>
    </>

    return (
        <div>
            <Navbar />
            <Container>
                <div className='pt-24'>
                    <div className="drawer md:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col justify-start">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="md:m-4 btn btn-circle btn-ghost fixed z-10 bg-neutral-200 md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current md:hidden"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>

                            {/* style={{ width: '1024px' }} md:absolute md:left-64 overflow-y-auto */}
                            <div className='md:py-10 md:ps-10 py-5'>
                                <Outlet />
                            </div>
                        </div>

                        <div className="drawer-side h-screen">
                            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                            {/* md:fixed md:top-0 */}
                            <ul style={{ fontSize: '16px' }} className="menu p-4 w-64 md:h-full border-r-4 border-neutral-300 bg-neutral-200 pt-10 mt-20 md:mt-0">
                                {/* Sidebar content here */}
                                {navItem}
                            </ul>
                        </div>
                    </div>

                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default Dashboard;