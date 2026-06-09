import React from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react"
import {HiUser,HiLogout} from "react-icons/hi"
import { Link } from 'react-router-dom'
export default function DashSidebar({tab}) {
  return (
    <Sidebar className='w-full md:w-56'>

      <SidebarItems>

        <SidebarItemGroup>

          <Link to="/dashboard?tab=profile">
            <SidebarItem as="div" icon={HiUser} active={tab==="profile"} label='User' labelColor='dark'>
              Profile
            </SidebarItem>
          
          </Link>


          <SidebarItem icon={HiLogout} className='cursor-pointer'>
            Signout
          </SidebarItem>

        </SidebarItemGroup>

      </SidebarItems>
    </Sidebar>
  )
}
