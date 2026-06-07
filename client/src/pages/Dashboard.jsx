import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom" 
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
export default function Dashboard() {
  const path=useLocation()
  const [tab ,setTab]=useState('')
  
  // whenever the path search changes means get the search params to render that sub section of dashboard
  useEffect(()=>{
    // extract all the search params from URL
    const urlParams= new URLSearchParams(path.search)
    
    // get the search params value you want 
    const tabParam=urlParams.get("tab")
    // console.log(tabParam);
    if(tabParam){
      setTab(tabParam)
    }
    
  },[path.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      {/* sidebar */}
      <div className='md:w-56'>
        <DashSidebar tab={tab}/>
      </div>


      {/* right side profile */}
      {tab==="profile"&&<DashProfile/>}
    </div>
  )
}
