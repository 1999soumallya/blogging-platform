import { UserLoginAction } from '@/services/actions/auth.action';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { MdOutlineLock } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as YUP from 'yup'

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch();

    const LoginValidation = YUP.object().shape({
        userName: YUP.string().required('Provide valid email id'),
        password: YUP.string().required('Provide your password').min(8, 'Provide at list 8 character for your password'),
    })

    const { loading } = useSelector((state) => state.authorization)

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(LoginValidation), mode: 'all' })

    const formSubmit = (data) => {
        UserLoginAction(data, dispatch)
    };

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.userName ? '!outline-red-300' : '')}
                                {...register('userName')}
                            />
                            {errors.userName ? <p className='text-red-300 text-sm absolute'>{errors.userName.message}</p> : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 flex relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.userName ? '!outline-red-300' : '')}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                className='absolute top-1/2 -translate-y-1/2 right-3'
                                onClick={() => setShowPassword((pre) => !pre)}>
                                {showPassword ? <FaRegEye  /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        {errors.password ? <p className='text-red-300 text-sm absolute'>{errors.password.message}</p> : null}
                    </div>

                    <div>
                        <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <Link to="/registration" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    )
}