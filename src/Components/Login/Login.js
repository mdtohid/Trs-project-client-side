import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import SignWithOthers from '../SignWithOthers/SignWithOthers';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    console.log(user);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
        // console.log(email, password);
        console.log(user);
    };

    useEffect(() => {
        if (user) {
            reset();
            navigate('/');
        }
    }, [user, reset, navigate]);

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <form className='flex flex-col gap-11 min-h-screen items-center justify-center w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-8/12 md:w-4/12 mt-14'>
                <h1 className='text-2xl text-blue-400'>Trs</h1>
                <p className='text-lg'>Welcome to! Please Login</p>
            </div>

            <SignWithOthers></SignWithOthers>

            <div className="divider w-8/12 md:w-4/12 mx-auto">OR</div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='email'
                    placeholder='Enter your email'
                    {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='password'
                    placeholder='Enter your password'
                    {...register("password", { required: "Password must be required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <p className='text-left mb-2'>
                    {error?.message === 'Firebase: Error (auth/user-not-found).' && 'User not found'}
                    {error?.message === 'Firebase: Error (auth/wrong-password).' && 'Wrong password.Try again'}
                </p>
                <input type="submit" value='Login' className='btn btn-outline w-full' />
                <p><Link to='/signup'>Create a account?</Link></p>
            </div>
        </form>
    );
};

export default Login;
