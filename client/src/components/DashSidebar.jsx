import React from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react"
import {HiUser,HiLogout} from "react-icons/hi"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
export default function DashSidebar({tab}) {

  const dispatch=useDispatch()

  async function handleSignout(){
      try {
        const response=await fetch("/api/v1/auth/signout",{
          method:"POST"
        })
        const data=await response.json()
  
        if(data.success===false){
          console.log(data.message);
          return
        }
        dispatch(signoutSuccess())
      } catch (error) {
        console.log(error);
        
      }
    }


  return (
    <Sidebar className='w-full md:w-56'>

      <SidebarItems>

        <SidebarItemGroup>

          <Link to="/dashboard?tab=profile">
            <SidebarItem as="div" icon={HiUser} active={tab==="profile"} label='User' labelColor='dark'>
              Profile
            </SidebarItem>
          
          </Link>


          <SidebarItem icon={HiLogout} className='cursor-pointer' onClick={handleSignout}>
            Signout
          </SidebarItem>

        </SidebarItemGroup>

      </SidebarItems>
    </Sidebar>
  )
}
