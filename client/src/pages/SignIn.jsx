import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {Label, TextInput, Button, Spinner, Alert} from "flowbite-react"
import {HiInformationCircle} from "react-icons/hi"

import { useSelector,useDispatch } from 'react-redux'
import {signinStart,signInSuccess,signInFailure} from "../redux/user/userSlice.js" 
import OAuth from '../components/OAuth.jsx'


export default function SignIn() {
  const [formData,setFormData]=useState({})
  //   const [loading,setLoading]=useState(false)
  //   const [errorMessage,setErrorMessage]=useState(null)
  
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const {loading,error:errorMessage}=useSelector((state)=>state.user)
  
    function handleChange(e){
      // console.log(e.target);
      
      setFormData({...formData,[e.target.id]:e.target.value.trim()})
    }
    // console.log(formData);
  
    async function handleSubmit(e){
      console.log(formData);
      
      e.preventDefault()
  
      try {
        // setLoading(true)
        // setErrorMessage(null)  // remove the previous error
        dispatch(signinStart())

        const response=await fetch('/api/v1/auth/signin',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })

        const data=await response.json()
        console.log(data);
        if(data.success===false){
          // setLoading(false)
          // setErrorMessage(data.message)
          dispatch(signInFailure(data.message))
          return; 
        }
        // setLoading(false)
        dispatch(signInSuccess(data.data))
        navigate('/')
        
      } catch (error) {
        // setErrorMessage(data.message)
        // setLoading(false)
        dispatch(signInFailure(data.message))
      }
      
    }
    // console.log(errorMessage);
    
    
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
  
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
  
              <div>
                <Label>Your email</Label>
  
                <TextInput
                  type='email'
                  placeholder='name@company.com'
                  id='email' onChange={handleChange}
                />
              </div>
  
              <div>
                <Label>Your password</Label>
  
                <TextInput
                  type='password'
                  placeholder='**********'
                  id='password' onChange={handleChange}
                />
              </div>
  
              <Button type='submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                  {
                    loading?(
                    <>
                      <Spinner size="sm" aria-label="Info spinner example" className="me-3" light/>
                        <span className='pl-3'>Loading...</span>
                      
                    </>
                    )
                    :'Sign In'
                  }
              </Button>

              {/* google auth */}
              <OAuth/>
              
            </form>
  
            <div className='flex gap-2 text-sm mt-5'>
              <span >Dont have an account?</span>
              <Link to='/sign-up' className='text-blue-500'>
                Sign Up
              </Link>
            </div>
            {
              errorMessage&&(
                <Alert color='failure' className='mt-5' icon={HiInformationCircle}>
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    )
}
