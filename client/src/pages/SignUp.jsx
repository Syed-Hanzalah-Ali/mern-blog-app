import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className='flex-1'>

          <Link
            className='font-bold text-4xl dark:text-white
                       '       
            to="/">
                <span
                className='bg-gradient-to-r from-green-700 to-blue-500 px-2 py-1
                            rounded-lg text-white'       
                >MERN</span>
                Blog
          </Link>

          <p className='text-sm mt-5'>This is a demo project. 
            You can sign up with your email and password or with google</p>

        </div>

        {/* right */}
        <div className='flex-1'>

          <form className='flex flex-col gap-4'>
            <div>
              <Label>Your username</Label>

              <TextInput
                type='text'
                placeholder='username'
                id='username'
              />
            </div>

            <div>
              <Label>Your email</Label>

              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
              />
            </div>

            <div>
              <Label>Your password</Label>

              <TextInput
                type='password'
                placeholder='password'
                id='password'
              />
            </div>

            <Button type='submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                Sign Up
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span >Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
