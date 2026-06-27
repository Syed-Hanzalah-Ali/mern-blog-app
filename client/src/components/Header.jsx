import React, { useEffect, useState } from 'react'
import {Avatar, Button, createTheme, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, ThemeProvider} from "flowbite-react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon, FaSun} from "react-icons/fa"
import {useDispatch, useSelector} from "react-redux" 
import {HiViewGrid,HiLogout, HiUser} from "react-icons/hi"
import { toogleTheme } from '../redux/theme/themeSlice.js'
import { signoutSuccess } from '../redux/user/userSlice.js'


export default function Header() {

    const path=useLocation().pathname;
    // console.log(path);
    const dispatch=useDispatch()
    const {theme}=useSelector((state)=>state.theme)

    const {currentUser}=useSelector((state)=>state.user)
    // console.log("user data: ",currentUser);

    const location=useLocation()
    const [searchTerm,setSearchTerm]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search)
        const search=urlParams.get('search')
        if(search){
            // console.log("form submit");
            setSearchTerm(search)
        }
        
        // console.log("from header");
        // run when the search params of url changes
    },[location.search])
    // console.log(searchTerm);
    

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

    async function handleSubmit(e){
        e.preventDefault()
        console.log(searchTerm);
        navigate(`/search?search=${searchTerm}`)

        
    }
    
    
  return (
    <div>
        <Navbar className='border-b-2'>
            <Link
            className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white
                       '       
            to="/">
                <span
                className='bg-gradient-to-r from-green-700 to-blue-500 px-2 py-1
                            rounded-lg text-white'       
                >MERN</span>
                Blog
            </Link>

            <form onSubmit={handleSubmit}>
                <TextInput id='search' type='text' placeholder='Search...' rightIcon={AiOutlineSearch}
                            className='hidden lg:inline'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
            </form>

            <Button className='lg:hidden w-12 h-10 p-0' color="light" pill>
                <AiOutlineSearch className=''/>
            </Button>

            <div className='flex gap-2 md:order-2' >
                <Button onClick={()=>dispatch(toogleTheme())} className='' color="light" pill>
                    {
                        theme==="light"?(<FaMoon/>):(<FaSun/>)
                    }
                </Button>

                {
                    currentUser?(
                        <Dropdown arrowIcon={false} inline 
                            label={
                                <Avatar img={currentUser.profilePicture} alt='user' rounded/>
                            }
                        >
                            <DropdownHeader>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                            </DropdownHeader>

                            <Link to="/dashboard?tab=profile">
                                <DropdownItem icon={HiUser}>Profile</DropdownItem>
                            </Link>

                            <DropdownDivider />
                            <DropdownItem onClick={handleSignout} icon={HiLogout}>Sign out</DropdownItem>

                        </Dropdown>
                    ):
                    (
                    <Link to="/sign-in">
                        <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                            Sign In
                        </Button>
                    </Link>

                    )
                }
            </div>

            <NavbarToggle />
            <NavbarCollapse>


                <NavbarLink  as={'div'} active={path==="/"} >
                        <Link to="/">
                            Home
                        </Link>
                </NavbarLink>

                <NavbarLink  as={'div'} active={path==="/about"}>
                        <Link to="/about">
                            About
                        </Link>
                </NavbarLink>

                <NavbarLink  as={'div'} active={path==="/projects"}>
                        <Link to="/projects">
                            Projects
                        </Link>
                </NavbarLink>

            </NavbarCollapse>
        </Navbar>
    </div>
  )
}
