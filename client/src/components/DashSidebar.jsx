import React from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react"
import {HiUser,HiLogout, HiDocumentText, HiUsers, HiAnnotation} from "react-icons/hi"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
export default function DashSidebar({tab}) {

  const dispatch=useDispatch()
  const {currentUser}=useSelector((state)=>state.user)

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

        <SidebarItemGroup className='flex flex-col gap-1'>

          <Link to="/dashboard?tab=profile">
            <SidebarItem as="div" icon={HiUser} active={tab==="profile"} label={currentUser.isAdmin?"Admin":"User"} labelColor='dark'>
              Profile
            </SidebarItem>
          
          </Link>

          {/* only admin */}
          {currentUser.isAdmin&&(
          <Link to="/dashboard?tab=posts">
            <SidebarItem as="div" icon={HiDocumentText} active={tab==="posts"}>
                Post
            </SidebarItem>
          </Link>

          )}

          {/* only admin */}
          {currentUser.isAdmin&&(
          <Link to="/dashboard?tab=users">
            <SidebarItem as="div" icon={HiUsers} active={tab==="users"}>
                Users
            </SidebarItem>
          </Link>

          )}

          {/* only admin */}
          {currentUser.isAdmin&&(
          <Link to="/dashboard?tab=comments">
            <SidebarItem as="div" icon={HiAnnotation} active={tab==="comments"}>
                Comments
            </SidebarItem>
          </Link>

          )}


          <SidebarItem icon={HiLogout} className='cursor-pointer' onClick={handleSignout}>
            Signout
          </SidebarItem>

        </SidebarItemGroup>

      </SidebarItems>
    </Sidebar>
  )
}
