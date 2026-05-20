import React from 'react'
import {Button, createTheme, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, ThemeProvider} from "flowbite-react"
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon} from "react-icons/fa"

// const customTheme=createTheme({
//     link: {
//         base: "block py-2 pl-3 pr-4 md:p-0",
//         active: {
//             on: "bg-primary-700 text-white md:bg-transparent md:text-blue-700 dark:text-blue",
//             off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
//         },
//         disabled: {
//             on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
//             off: ""
//         }
//   }
// })

export default function Header() {

    const path=useLocation().pathname;
    // console.log(path);
    
  return (
    <div>
        <Navbar className='border-b-2'>
            <Link
            className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white
                       '       
            to="/">
                <span
                className='bg-gradient-to-r from-lime-500 to-blue-500 px-2 py-1
                            rounded-lg text-white'       
                >MERN</span>
                Blog
            </Link>

            <form >
                <TextInput id='search' type='text' placeholder='Search...' rightIcon={AiOutlineSearch}
                            className='hidden lg:inline'
                />
            </form>

            <Button className='lg:hidden w-12 h-10 p-0' color="light" pill>
                <AiOutlineSearch className=''/>
            </Button>

            <div className='flex gap-2 md:order-2' >
                <Button className='w-12 h-10 hidden sm:inline p-0' color="light" pill>
                    <FaMoon/>
                </Button>

                <Link to="/sign-in">
                    <Button className='bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500'>
                        Sign In
                    </Button>
                </Link>
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
