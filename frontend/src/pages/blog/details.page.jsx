import { FetchBlogDetailsAction } from '@/services/actions/blog.action'
import Loader from '@/shared/Loader'
import moment from 'moment-timezone'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

export default function BlogDetailsPage() {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { loading, blog } = useSelector(state => state.blogDetails)

    useEffect(() => {
        if (id) {
            FetchBlogDetailsAction(id, dispatch)
        }
    }, [id, dispatch])

    return (
        <div className="bg-gray-50 font-sans text-gray-800 antialiased flex items-center justify-center p-4 min-h-[90vh]">
            {
                loading ? <Loader /> : blog ? (
                    <main className="container mx-auto px-4 py-12 max-w-4xl">
                        <article className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
                            <header className="mb-8 border-b border-gray-200 pb-6">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                    {blog?.title}
                                </h1>
                                <div className="flex flex-wrap items-center text-gray-600 text-md md:text-lg">
                                    <span className="font-medium mr-2">By {blog?.author}</span>
                                    <span className="text-gray-400 hidden sm:inline">|</span>
                                    <span className="ml-0 sm:ml-2 mt-1 sm:mt-0">Created on: {moment(blog?.createAt).format('MMMM DD, YYYY')}</span>
                                </div>
                            </header>
                            <section className="text-lg text-gray-700 leading-relaxed">
                                <p>{blog?.content}</p>
                            </section>
                            <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                                <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                    </svg>
                                    Back to All Blogs
                                </Link>
                            </div>
                        </article>
                    </main>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-lg mx-auto">
                        <svg className="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">Blog Details Not Found</h2>
                        <p className="text-gray-600 text-lg mb-6">
                            We couldn't find the blog post you're looking for. It might have been deleted or moved.
                        </p>
                        <Link to="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-medium">
                            Go Back Home
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
