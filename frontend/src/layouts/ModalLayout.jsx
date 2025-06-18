import CreateBlogModal from '@/component/createblog.modal'
import DeleteBlogModal from '@/component/deleteblog.modal'
import { MODAL_LAYOUT } from '@/config/modal'
import { closeModal } from '@/services/actions/modal.action'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ModalLayout() {

    const { isOpen, header, body } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    const handleClose = () => {
        closeModal(dispatch)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[#4b5666a8] bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4">
                    <h2 className="text-2xl font-bold text-gray-900">{header}</h2>
                    <button onClick={() => handleClose()} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close modal">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {
                    {
                        [MODAL_LAYOUT.BLOG_OPERATION.CREATE]: <CreateBlogModal closeModal={handleClose} />,
                        [MODAL_LAYOUT.BLOG_OPERATION.EDIT]: <CreateBlogModal closeModal={handleClose} />,
                        [MODAL_LAYOUT.BLOG_OPERATION.DELETE]: <DeleteBlogModal closeModal={handleClose} />,
                        [MODAL_LAYOUT.DEFAULT]: <div>Default Modal</div>,
                    }[body]
                }
            </div>
        </div>
    )
}
