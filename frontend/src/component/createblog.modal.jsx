import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import axios from '@/config/axios';
import toast from 'react-hot-toast';
import { CREATE_BLOG, UPDATE_BLOG } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { BLOG_CONSTANTS } from '@/services/constants/blog.constants';

export default function CreateBlogModal({ closeModal }) {
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const { others } = useSelector(state => state.modal)

    const formSchema = Yup.object().shape({
        author: Yup.string().trim().required('Author is required').min(3, 'Author must be at least 2 characters'),
        title: Yup.string().trim().required('Title is required').min(3, 'Title must be at least 3 characters'),
        content: Yup.string().trim().required('Content is required').min(20, 'Content must be at least 20 characters'),
    });

    const { register, handleSubmit, reset, formState: { errors }, setError, setValue } = useForm({ resolver: yupResolver(formSchema), defaultValues: { title: '', content: '' } });

    useEffect(() => {
        if (others && others.blog) {
            Object.entries(others.blog).forEach(([fields, value]) => {
                setValue(fields, value)
            })
        }
    }, [others, setValue])


    const onSubmit = (data) => {
        setLoading(true)
        if (others && others.blog) {
            axios.put(UPDATE_BLOG(others.blog._id), data).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message)
                    reset()
                    closeModal();
                    dispatch({ type: BLOG_CONSTANTS.UPDATE_BLOG, payload: response.data.data })
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
        } else {
            axios.post(CREATE_BLOG, data).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message)
                    reset()
                    closeModal();
                    dispatch({ type: BLOG_CONSTANTS.ADD_NEW_BLOG, payload: response.data.data })
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
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Body */}
            <div className="p-6">
                <div className="mb-6">
                    <label htmlFor="blog-title" className="block text-gray-700 text-sm font-bold mb-2">
                        Author
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="blog-title"
                            {...register('author')}
                            className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.author ? '!outline-red-300' : '')}
                            placeholder="Enter blog author"
                        />
                        {errors.author ? <p className='text-red-300 text-sm absolute'>{errors.author.message}</p> : null}
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="blog-title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="blog-title"
                            {...register('title')}
                            className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " + (errors.title ? '!outline-red-300' : '')}
                            placeholder="Enter blog title"
                        />
                        {errors.title ? <p className='text-red-300 text-sm absolute'>{errors.title.message}</p> : null}
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="blog-content" className="block text-gray-700 text-sm font-bold mb-2">
                        Content
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="blog-content"
                            {...register('content')}
                            className={'shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] overflow-y-auto bg-white p-4 ' + (errors.content ? '!outline-red-300' : '')}
                        />
                        {errors.content ? <p className='text-red-300 text-sm absolute'>{errors.content.message}</p> : null}
                    </div>
                </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                <button disabled={loading} type='button' onClick={closeModal} className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 ease-in-out">
                    Cancel
                </button>
                <button disabled={loading} type='submit' className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
                    {(others && others.blog) ? 'Update' : 'Create'} Blog
                </button>
            </div>
        </form>
    )
}
