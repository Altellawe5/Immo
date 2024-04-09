import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Style from './AppLayout.module.css'

const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>


    )
}

export default AppLayout