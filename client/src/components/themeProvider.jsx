import React from 'react'
import {useSelector} from "react-redux"


// we wrapped the main router with this component so that router become childern of it
// now to render the main router we have to accept it as children
export default function ({children}) {
    const {theme}=useSelector((state)=>state.theme)
    // console.log("theme is: ",theme);
    
  return (
    <div className={theme}>
        <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
            {children}
        </div>
    </div>
  )
}
