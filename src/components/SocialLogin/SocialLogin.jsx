import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { signInWithGoogle, setLoading } = useAuth();

    // redirect after Google Sign In to target page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // ========= save user info in mongoDB ========
                const signedUser = result.user;
                const { displayName, email, photoURL } = signedUser;
                const savedUser = { name: displayName, email: email, photo: photoURL }
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
                            text: 'Successfully Login with Google!',
                            showConfirmButton: true,
                        })
                        navigate(from, { replace: true })
                    })
                // ========= save user info in mongoDB ========
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`
                })
                setLoading(false)
            })
    }

    return (
        <div>
            <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 hover:bg-neutral-200 border-rounded cursor-pointer'>
                <FcGoogle size={32} />
                <p>Continue with Google</p>
            </div>
        </div>
    );
};

export default SocialLogin;