import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import {useSelector} from "react-redux"
export default function DashProfile() {

  const {currentUser}=useSelector((state)=>state.user)
  console.log(currentUser);
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4'>

        <div className='w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt="profilePicture" 
          className='rounded-full w-full h-full object-cover'/>

        </div>

        <TextInput
        type='text'
        placeholder='username'
        id='username'
        defaultValue={currentUser.username}
        />

        <TextInput
        type='email'
        placeholder='email'
        id='email'
        defaultValue={currentUser.email}
        />

        <TextInput
        type='password'
        placeholder='new password'
        id='newPassword'
        />

        <TextInput
        type='password'
        placeholder='old password'
        id='oldPassword'
        />

        <Button type='Submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
          Update
        </Button>

      </form>

      {/* delete and signout buttons */}
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>

    </div>
  )
}
