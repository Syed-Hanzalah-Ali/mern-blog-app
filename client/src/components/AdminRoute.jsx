import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
  
    const {currentUser}=useSelector((state)=>state.user)

    return currentUser?.isAdmin?<Outlet/>:currentUser?<Navigate to="/dashboard"/>:<Navigate to="/sign-in"/>
}
