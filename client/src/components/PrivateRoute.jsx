import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import SignIn from '../pages/SignIn'

export default function PrivateRoute() {
    const {currentUser}=useSelector((state)=>state.user)

  return currentUser?<Outlet/>:<Navigate to="/sign-in"/>

// with below logic "sign-in" page will show but will not navigate to sign-in (url not change)
    // return (
    //     <div>
    //         {
    //             currentUser?<Outlet/>:<SignIn/>
    //         }
    //     </div>
    // )
}
