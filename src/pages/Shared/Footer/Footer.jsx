import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiCopyright } from "react-icons/bi";
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/Logo/logo.png'
import FooterContainer from '../../../components/Container/FooterContainer';

const Footer = () => {
    return (
        <div className='pt-16 bg-[#e6e6e6] text-neutral-800'>
            <FooterContainer>
                <footer className="footer grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
                    <div className='md:col-span-2 pe-5'>
                        <Link to="/">
                            <img className='h-16 w-fit mb-2' src={logo} alt="Language Club School Logo" />
                        </Link>
                        <p>This language club is a online education organization where individuals come together to learn, practice, and improve their language skills. It provides a supportive and interactive environment for language enthusiasts to connect with like-minded people who share a common interest in language learning.</p>
                    </div>
                    <div>
                        <span className="footer-title">About</span>
                        <Link to='/' className="link link-hover">Home</Link>
                        <Link to='/instructors' className="link link-hover">Instructors</Link>
                        <Link to='/classes' className="link link-hover">Classes</Link>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About</a>
                        <a className="link link-hover">Be Instructor</a>
                        <a className="link link-hover">Be A Teacher</a>
                    </div>
                    <div>
                        <span className="footer-title">Contact</span>
                        <a className="link link-hover">languageclub@info.com</a>
                        <a className="link link-hover">+00 415 236 102</a>
                        <a className="link link-hover">250, Dhaka, Gulshan</a>
                        <div className='flex gap-3 mt-5'>
                            <a className='bg-neutral-400 hover:bg-orange-500 hover:text-neutral-50 rounded-full p-2 text-center cursor-pointer'><FaFacebook className='w-5 h-5' /></a>

                            <a className='bg-neutral-400 hover:bg-orange-500 hover:text-neutral-50 rounded-full p-2 text-center cursor-pointer'><FaTwitter className='w-5 h-5' /></a>

                            <a className='bg-neutral-400 hover:bg-orange-500 hover:text-neutral-50 rounded-full p-2 text-center cursor-pointer'><FaLinkedin className='w-5 h-5' /></a>

                            <a className='bg-neutral-400 hover:bg-orange-500 hover:text-neutral-50 rounded-full p-2 text-center cursor-pointer'><FaInstagram className='w-5 h-5' /></a>
                        </div>
                    </div>
                </footer>
            </FooterContainer>
            <div className='flex gap-2 items-center justify-center bg-orange-600 text-white px-5 py-3'>
                <BiCopyright />
                <p><small>All right reserved 2023 | Language Club School</small></p>
            </div>
        </div>
    );
};

export default Footer;