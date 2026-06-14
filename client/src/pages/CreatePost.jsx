import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import TextEditor from '../components/TextEditor'


export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>

        <form className='flex flex-col gap-4'>

            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title'
                className='flex-1'/>

                <Select>
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="Nextjs">Next.js</option>
                </Select>
            </div>

            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>

                <FileInput id='file' accept='images/*'/>
                <Button type='button' outline>
                    Upload Image
                </Button>
            </div>

            <TextEditor required/>

            <Button type='submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">Submit</Button>

        </form>
    </div>
  )
}
