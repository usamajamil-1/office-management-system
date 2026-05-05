import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {

    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const role = localStorage.getItem('role')

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    if (allowedRoles && !allowedRoles.includes(role)){
        return <Navigate to="/dashboard" />
    }
    return children


}

export default ProtectedRoute