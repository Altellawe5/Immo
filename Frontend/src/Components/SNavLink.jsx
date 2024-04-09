import React from 'react'
import { NavLink } from 'react-router-dom'

const SNavLink = (props) => {
    return (
        <>
            <NavLink {...props}>
                {props.children}
            </NavLink>
        </>
    )
}

export default SNavLink