import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = ({ }) => {
    const { userLogin, googleLogin } = useContext(AuthContext);

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log(data);
        userLogin(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("User login successfully!!");
                setLoginEmail(data.email);
                navigate(from, { replace: true })

            })
            .catch(error => console.error(error))
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true })
                console.log(user)
            })
            .then(error => console.error(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)} className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse w-1/2">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl glass bg-transparent">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-white">Enter Your Email</span>
                                </label>
                                <input type="email" {...register("email", {
                                    required: "Please enter your email"
                                })} placeholder="Email" className="input input-bordered" />
                                {
                                    errors.email && <p className='text-red-600'>{errors.email.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-white ">Enter Your Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: "Please enter your password"
                                })} placeholder="Password" className="input input-bordered" />
                                {
                                    errors.password && <p className='text-red-600'>{errors.password.message}</p>
                                }
                                <label className="label">
                                    <Link to='/signup' className="text-white">Don't have an account? sign up now!</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-accent bg-transparent text-white">Login</button>
                            </div>
                            <h3 className='text-center'>Or</h3>
                            <div className=" mt-6">
                                <button onClick={handleGoogleLogin} className="btn btn-accent bg-transparent text-white w-full">Google Login</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Toaster />
            </form>
        </div>
    );
};

export default Login;