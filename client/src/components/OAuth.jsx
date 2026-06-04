import React from 'react'
import {Button} from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase.js'

import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js' 
import { useNavigate } from 'react-router-dom'
export default function OAuth() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    async function handleGoogleAuth(){
        const auth=getAuth(app)  // return the auth instance
        
        const provider=new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})

        try {
            const resultFromGoogle=await signInWithPopup(auth,provider)
            const user=resultFromGoogle.user
            console.log(user);

            const result=await fetch("/api/v1/auth/google",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:user.displayName,
                    email:user.email,
                    photoURL:user.photoURL
                })
            })

            const data=await result.json()

            if(data.success===true){
                dispatch(signInSuccess(data.data))
                navigate('/')
            }
            
        } catch (error) {
            console.log(error);
            
        }

    }

  return (
    <Button onClick={handleGoogleAuth} type='button' className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800">
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}
