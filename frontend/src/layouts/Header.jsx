import { AuthState } from '@/context/auth.context'
import { UserLogoutAction } from '@/services/actions/auth.action'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function Header() {

    const { userDetails } = AuthState()
    const dispatch = useDispatch()

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
                <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={() => document.getElementById("user-dropdown").classList.toggle("hidden")} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <p className="p-3 rounded-full flex items-center justify-center text-white" alt="user photo">
                            {userDetails?.firstName[0]} {userDetails?.lastName[0]}
                        </p>
                    </button>
                    <div className="z-50 hidden absolute top-11 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                {userDetails?.firstName} {userDetails?.lastName}
                            </span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                {userDetails?.email}
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <button onClick={() => UserLogoutAction(dispatch)} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}
