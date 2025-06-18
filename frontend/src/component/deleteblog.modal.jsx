import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from '@/config/axios';
import toast from 'react-hot-toast';
import { CREATE_BLOG, DELETE_BLOG } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { BLOG_CONSTANTS } from '@/services/constants/blog.constants';

export default function DeleteBlogModal({ closeModal }) {
    const [loading, setLoading] = useState(false)

    const { others } = useSelector(state => state.modal)

    const dispatch = useDispatch() 

    const onSubmit = () => {
        setLoading(true)
        axios.delete(DELETE_BLOG(others.blog._id)).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
                closeModal();
                dispatch({ type: BLOG_CONSTANTS.REMOVE_BLOG, payload: others.blog._id })
            } else {
                toast.error(response.data.message)
            }
            setLoading(false);
        }).catch((error) => {
            if (error.response) {
                toast.error(error.response.data.message)
            }
            setLoading(false);
        })
    }

    return (
        <div>
            {/* Modal Body */}
            <div className="mb-6 text-center">
                <div className="text-red-500 mb-3 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
                    {/* Warning Icon (e.g., Exclamation Triangle) */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
                <p className="text-gray-700 text-lg">
                    Are you sure you want to delete the blog post <br /> "<span className="font-medium">{others?.blog?.title}</span>" ?
                </p>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                <button disabled={loading} onClick={closeModal} type='button' className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 ease-in-out">
                    Cancel
                </button>
                <button disabled={loading} onClick={() => onSubmit()} type='button' className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
                    Delete Blog
                </button>
            </div>
        </div>
    )
}
