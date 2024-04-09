import React from 'react'
import SNavLink from '../SNavLink'
import Style from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.token);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const handleLogout = async () => {
        try {
            console.log("token", token)
            const response = await axios.get('http://localhost:3000/users/logout', { headers: { 'x-auth-token': token } });

            if (response.status === 200) {
                dispatch(logout());
                toast.success('admin logged out successfully')
                navigate("/");
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error(error.response.data);

            toast.error('Error logging out: ' + error.message)

        }
    }
    return (
        <>
            <ToastContainer />
            <header className={Style.header}>
                <SNavLink to="/" className={Style.logoDiv}>
                    {/* <img className={Style.logo} src={require('../../assets/logoCut.png')} alt="sui" /> */}
                    <span>Elevate Reality</span>
                </SNavLink>
                <div className={Style.navDiv}>
                    <nav className={Style.navigation}>
                        <SNavLink to="/" className={Style.navLinks}>Home</SNavLink>
                        <SNavLink className={Style.navLinks}>Contact</SNavLink>
                        <SNavLink to="/favorites" className={Style.navLinks}>Favorites</SNavLink>
                    </nav>
                </div>
                <div className={Style.login}>
                    {isAuthenticated
                        ? <SNavLink className={Style.loginLinks} onClick={handleLogout}>Logout</SNavLink>
                        : <SNavLink to="/login" className={Style.loginLinks}>Log in</SNavLink>
                    }
                </div>

            </header>
        </>
    )
}

export default Header