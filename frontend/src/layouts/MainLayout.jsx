import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import ModalLayout from './ModalLayout'

export default function MainLayout() {
    return (
        <div className='min-h-screen'>
            <Header />
            <Outlet />
            <ModalLayout />
        </div>
    )
}
