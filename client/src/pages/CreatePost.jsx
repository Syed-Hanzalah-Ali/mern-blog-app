import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import TextEditor from '../components/TextEditor'
import { useNavigate } from 'react-router-dom'


export default function CreatePost() {
    const [formData,setFormData]=useState({content:''})
    const [file,setFile]=useState(null)

    const [publishError,setPublishError]=useState(null)

    const navigate=useNavigate()

    
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
    
            const response=await fetch("/api/v1/posts/create",{
                method:"POST",
                body:form
            })
    
            const result=await response.json()
            
            if(result.success===false){
                setPublishError(data.message)
                return
            }
            // console.log(data);
            setPublishError(null)
            navigate(`/post/${result.data._id}`)

        } catch (error) {
            setPublishError(error.message)
            
        }
        
    }
    
    
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput onChange={(e)=>setFormData({...formData,title:e.target.value})}
                 type='text' placeholder='Title' required id='title'
                className='flex-1'/>

                <Select onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="Nextjs">Next.js</option>
                </Select>
            </div>

            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>

                <FileInput onChange={(e)=>setFile(e.target.files[0])} id='file' accept='images/*'/>
                <Button type='button' outline>
                    Upload Image
                </Button>
            </div>

            <TextEditor onChange={(value)=>setFormData({...formData,content:value})} required/>

            <Button type='submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                Publish
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
