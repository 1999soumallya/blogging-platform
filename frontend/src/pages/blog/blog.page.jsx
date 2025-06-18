import { MODAL_LAYOUT } from '@/config/modal';
import { AuthState } from '@/context/auth.context';
import { FetchBlogListAction } from '@/services/actions/blog.action';
import { openModal } from '@/services/actions/modal.action';
import moment from 'moment-timezone';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BiPlusCircle } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function BlogList() {
    const dispatch = useDispatch()

    const { userDetails } = AuthState()

    const [openActionMenu, setOpenActionMenu] = useState({});
    const menuRef = useRef(null);

    const { loading, hasMore, blogs, pagination } = useSelector((state) => state.blogs)

    const fetchMoreData = useCallback(() => {
        if (!hasMore || loading) {
            return;
        }
        FetchBlogListAction({ page: pagination ? pagination.page + 1 : 1 }, dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, hasMore, loading]);

    useEffect(() => {
        fetchMoreData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && hasMore && !loading) {
                fetchMoreData();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, loading, fetchMoreData]);

    // Effect to close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenActionMenu({});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleCreateNewBlog = () => {
        openModal({ header: 'Create New Blog', body: MODAL_LAYOUT.BLOG_OPERATION.CREATE }, dispatch)
    };

    const handleBlogActionButtonClick = (blogId) => {
        setOpenActionMenu({ [blogId]: !openActionMenu[blogId] });
    };

    const handleEditBlog = (blog) => {
        openModal({ header: 'Update blog details', body: MODAL_LAYOUT.BLOG_OPERATION.EDIT, others: { blog } }, dispatch)
        handleBlogActionButtonClick(blog._id)
    };

    const handleDeleteBlog = (blog) => {
        openModal({ header: '', body: MODAL_LAYOUT.BLOG_OPERATION.DELETE, others: { blog } }, dispatch)
        handleBlogActionButtonClick(blog._id)
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
                        Our Blog
                    </h1>
                    <button onClick={() => handleCreateNewBlog()} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Create New Blog">
                        <BiPlusCircle size={20} />
                        <span>Create New Blog</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:scale-105 transition duration-300 ease-in-out">
                                <div className="p-6 relative">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                                        {blog.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        By <span className="font-medium text-gray-700">{blog?.author}</span> on {moment(blog.createdAt).format('YYYY-MM-DD')}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {blog.content.slice(0, 100)}
                                    </p>
                                    {
                                        (userDetails._id == blog.user) ? (
                                            <div className="absolute top-4 right-4" ref={openActionMenu[blog._id] ? menuRef : null}>
                                                <button title="More options" aria-label={`More options for ${blog.title}`} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBlogActionButtonClick(blog._id);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal text-gray-600">
                                                        <circle cx="12" cy="12" r="1"></circle>
                                                        <circle cx="19" cy="12" r="1"></circle>
                                                        <circle cx="5" cy="12" r="1"></circle>
                                                    </svg>
                                                </button>

                                                {
                                                    openActionMenu[blog._id] && (
                                                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                                                            <button onClick={() => handleEditBlog(blog)} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit mr-2">
                                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                </svg> Edit
                                                            </button>
                                                            <button onClick={() => handleDeleteBlog(blog)} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800" role="menuitem">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 mr-2">
                                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                </svg> Delete
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <div className="px-6 pb-6 pt-0">
                                    <Link to={'/blog/' + blog._id} className="inline-block text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out" aria-label={`Read more about ${blog.title}`}>
                                        Read More &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {
                    loading && (
                        <div className="text-center py-4 text-lg text-gray-600">
                            Loading more blogs...
                        </div>
                    )
                }
                {
                    (!hasMore && !loading) ? (blogs.length > 0) ? (
                        <p className="text-center py-4 text-gray-500">
                            <b>Yay! You have seen all blogs.</b>
                        </p>
                    ) : (
                        <p className="text-center py-4 text-gray-500">
                            <b>No blogs to display.</b>
                        </p>
                    ) : null
                }
            </div>
        </div>
    )
}
