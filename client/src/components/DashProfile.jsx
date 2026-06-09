import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useRef, useState } from 'react'
import {useSelector} from "react-redux"
import {HiInformationCircle} from "react-icons/hi"

export default function DashProfile() {

  const {currentUser}=useSelector((state)=>state.user)
  // console.log(currentUser);

  const [imageFile,setImageFile]=useState(null)
  const [imageURL,setImageURL]=useState(null)

  const fileRef=useRef(null)
  // console.log(ref);

  function handleImage(e){
    const file=e.target.files[0]
    // console.log(file);

    if(file){
      setImageFile(file)
      setImageURL(URL.createObjectURL(file))
      
    }
    
  }
  // console.log(imageFile);
  // console.log(imageFile,"    ",imageURL);
  
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4'>

        <input hidden type="file" accept='image/*' ref={fileRef} onChange={handleImage}/>

        <div className='w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full' onClick={()=>fileRef.current.click()}>
          <img src={imageURL || currentUser.profilePicture} alt="profilePicture" 
          className='rounded-full w-full h-full object-cover'/>

        </div>

        {
          imageFile?.size>16777216&&(
          <Alert color='failure' className='mt-5' icon={HiInformationCircle}>
            image is larger than 2KB
          </Alert>)
        }

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
