import axios from '@/config/axios';
import { REGISTRATION_URL } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from 'yup'

export default function RegistrationPage() {
  const [show, setShow] = useState({ password: false, cPassword: false })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const LoginValidation = YUP.object().shape({
    firstName: YUP.string().required('First name is required'),
    lastName: YUP.string().required('Last name is required'),
    email: YUP.string().required('Email is required').email('Provide valid email id'),
    password: YUP.string().required('Password is required').min(8, 'Provide at list 8 character for your password'),
    confirmPassword: YUP.string().required('Provide your password again').min(8, 'Provide at list 8 character for your password').oneOf([YUP.ref('password')], 'Your password and confirm password is not matched'),
  })

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({ resolver: yupResolver(LoginValidation), mode: 'all' })

  const formSubmit = (data) => {
    setLoading(true)
    axios.post(REGISTRATION_URL, data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message)
        reset()
        navigate('/', { replace: true });
      } else {
        toast.error(response.data.message)
      }
      setLoading(false);
    }).catch((error) => {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((details) => {
          setError(details.path, { type: 'validate', message: details.msg })
        })
      }
      setLoading(false);
    })
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                type="text"
                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.firstName ? '!outline-red-300' : '')}
                {...register('firstName')}
              />
              {errors.firstName ? <p className='text-red-300 text-sm absolute'>{errors.firstName.message}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                type="text"
                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.lastName ? '!outline-red-300' : '')}
                {...register('lastName')}
              />
              {errors.lastName ? <p className='text-red-300 text-sm absolute'>{errors.lastName.message}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.email ? '!outline-red-300' : '')}
                {...register('email')}
              />
              {errors.email ? <p className='text-red-300 text-sm absolute'>{errors.email.message}</p> : null}
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
                type={show.password ? "text" : "password"}
                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.userName ? '!outline-red-300' : '')}
                {...register('password')}
              />
              <button
                type="button"
                className='absolute top-1/2 -translate-y-1/2 right-3'
                onClick={() => setShow((pre) => ({ ...pre, password: !pre.password }))}>
                {show.password ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password ? <p className='text-red-300 text-sm absolute'>{errors.password.message}</p> : null}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2 flex relative">
              <input
                id="confirmPassword"
                type={show.cPassword ? "text" : "password"}
                className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.confirmPassword ? '!outline-red-300' : '')}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                className='absolute top-1/2 -translate-y-1/2 right-3'
                onClick={() => setShow((pre) => ({ ...pre, cPassword: !pre.cPassword }))}>
                {show.cPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword ? <p className='text-red-300 text-sm absolute'>{errors.confirmPassword.message}</p> : null}
          </div>

          <div>
            <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
