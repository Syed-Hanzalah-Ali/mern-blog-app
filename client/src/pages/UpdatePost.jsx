import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import TextEditor from '../components/TextEditor'
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector} from "react-redux"

export default function UpdatePost() {
    const {currentUser}=useSelector((state)=>state.user)

    const [formData,setFormData]=useState({content:''})
    const [file,setFile]=useState(null)
    const [fileUrl,setFileUrl]=useState(null)

    const [publishError,setPublishError]=useState(null)

    const navigate=useNavigate()

    const {postId}=useParams()
    // console.log(postId);

    useEffect(()=>{

        async function getPost(){
            try {
                const response=await fetch(`/api/v1/posts/getposts?postId=${postId}`)
                const result=await response.json()
                
                if(result.success===true){
                    setPublishError(null)
                    // console.log(result.data.posts[0]);
                    setFormData(result.data.posts[0])
                    
                }
                else{
                    // console.log(result.message);
                    setPublishError(result.message)
                    
                }
            } 
            catch (error) {
                // console.log(error.message);
                setPublishError(error.message)
                
            }

        }

        getPost()
    },[postId])
    

    function handleImage(e){
        const file=e.target.files[0]
    // console.log(file);

        if(file){
            setFile(file)
            setFileUrl(URL.createObjectURL(file))
      
        }
    
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        // console.log(formData);
        // console.log(file);
        setPublishError(null)
        try {
            const form=new FormData()
            form.append('title',formData.title)
            form.append('content',formData.content)
            if(formData.category){
                form.append('category',formData.category)
    
            }
            if(file){
                form.append('image',file)
            }
    
            const response=await fetch(`/api/v1/posts/update/${currentUser._id}/${formData._id}`,{
                method:"PATCH",
                body:form
            })
    
            const result=await response.json()
            
            if(result.success===false){
                setPublishError(data.message)
                return
            }
            // console.log(result);
            setPublishError(null)
            navigate(`/post/${result.data._id}`)

        } catch (error) {
            setPublishError(error.message)
            
        }
        
    }
    // console.log("form: ",formData);
    

    
    
    
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput onChange={(e)=>setFormData({...formData,title:e.target.value})}
                 type='text' placeholder='Title' required id='title'
                className='flex-1' 
                value={formData.title || ''}/>

                <Select onChange={(e)=>setFormData({...formData,category:e.target.value})} value={formData.category || ''}>
                    <option value="Uncategorized">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="Nextjs">Next.js</option>
                </Select>
            </div>

            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>

                <FileInput onChange={handleImage} 
                id='file' accept='images/*'/>

                <Button type='button' outline>
                    Upload Image
                </Button>

                
            </div>
            {
                formData.image&&(
                    <img src={fileUrl || formData.image}
                    alt='upload'
                    className='w-full h-72 object-cover'
                    />
                )
            }

            <TextEditor content={formData.content} onChange={(value)=>setFormData({...formData,content:value})} required/>

            <Button type='submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                Update
            </Button>

            {
                publishError&&(
                    <Alert className='mt-5' color='failure'>{publishError}</Alert>
                )
            }

        </form>
    </div>
  )
}
