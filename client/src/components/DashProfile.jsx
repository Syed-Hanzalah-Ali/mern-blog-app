import { Alert, Button, Modal, ModalBody, ModalHeader, Spinner, TextInput } from 'flowbite-react';
import React, { useRef, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {HiInformationCircle,HiOutlineExclamationCircle} from "react-icons/hi"
import { updateStart,updateSuccess,updateFailure,deleteStart,deleteSuccess,deleteFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function DashProfile() {

  const {currentUser,loading,error}=useSelector((state)=>state.user)
  // console.log(currentUser);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [imageFile,setImageFile]=useState(null)
  const [imageURL,setImageURL]=useState(null)

  const [updateSuccessMsg,setUpdateSuccessMsg]=useState(false)
  // form data
  const [formData,setFormData]=useState({
    username:currentUser.username,
    email:currentUser.email,
    oldPassword:"",
    newPassword:""
  })
  // console.log("form data: ",formData);

  // modal 
  const [openModal, setOpenModal] = useState(false);

  

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
  
  
  function handleChange(e){
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  

  async function handleSubmit(e){
    e.preventDefault()
    
    try {
      dispatch(updateStart())
      setUpdateSuccessMsg(false)// to remove the success message
      const form=new FormData()

      form.append("username",formData.username)
      form.append("email",formData.email)
      form.append("newPassword",formData.newPassword)
      form.append("oldPassword",formData.oldPassword)

      if(imageFile){
        console.log(imageFile);
        
        form.append("profilePicture",imageFile)
      }

      const response=await fetch(`/api/v1/users/update/${currentUser._id}`,
        {
          method:"PATCH",
          body:form
        }
      )

      const data=await response.json()


      if(data.success===false){
        dispatch(updateFailure(data.message))
        return
      }

      dispatch(updateSuccess(data.data))
      setUpdateSuccessMsg(true)

    } 
    catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

  async function handleDelete(e){
    // console.log("deleting...");
    setOpenModal(false)
    try {
      dispatch(deleteStart())

      const response=await fetch(`/api/v1/users/delete/${currentUser._id}`,{
        method:"DELETE"
      })

      const data=await response.json()

      if(data.success===false){
        dispatch(deleteFailure(data.message))
        return
      }
      dispatch(deleteSuccess())

    } 
    catch (error) {
      dispatch(deleteFailure(error.message))
    }
    
  }
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

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
        onChange={handleChange}
        />

        <TextInput
        type='email'
        placeholder='email'
        id='email'
        defaultValue={currentUser.email}
        onChange={handleChange}
        />

        <TextInput
        type='password'
        placeholder='new password'
        id='newPassword'
        onChange={handleChange}
        />

        <TextInput
        type='password'
        placeholder='old password'
        id='oldPassword'
        onChange={handleChange}
        />

        <Button  type='Submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
          {
            loading?(
            <>
              <Spinner size="sm" aria-label="Info spinner example" className="me-3" light/>
                <span className='pl-3'>Loading...</span>
              
            </>
            )
            :'Update'
          }
        </Button>

      </form>

      {/* delete and signout buttons */}
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={()=>setOpenModal(true)} className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>

      {updateSuccessMsg&&<Alert className='mt-5' color='success'>User is updated successfully</Alert>}
      
      {error &&<Alert className='mt-5' color='failure'>{error}</Alert>}

      <Modal show={openModal} size='md' onClose={()=>setOpenModal(false)} popup>
        <ModalHeader/>
        <ModalBody>
           
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
