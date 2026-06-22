import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddCallToAction from '../components/AddCallToAction'

export default function PostPage() {

    const {postId}=useParams()
    // console.log(postId);
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [post,setPost]=useState(null)

    useEffect(()=>{
        async function getPost(){
            try {
                setLoading(true)
                setError(null)
                const response=await fetch(`/api/v1/posts/getposts?postId=${postId}`)
                const result=await response.json()

                if(result.success===false){
                    setLoading(false)
                    setError(result.message)
                    return
                }
                setPost(result.data.posts[0])
                setLoading(false)
                setError(null)
                
            } 
            catch (error) {
                setLoading(false)
                setError(result.message)

                console.log(error.message);
                    
            }
        }

        getPost()
    },[postId])
    console.log(post);
    
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {loading?
        (

            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl'/>
            </div>
        )
        :(
            <>
                <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post&&post.title}</h1>

                <Link className='self-center mt-5' to={`/search?category=${post&&post.category}`}>
                <Button pill color='gray' size='xs'>
                    {post&&post.category}
                </Button>
                </Link>

                <img src={post&&post.image} alt='post.image' className='mt-10 p-3 max-h-[600px] w-full object-cover'/>

                <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                    <span>{post&&new Date(post.updatedAt).toLocaleDateString()}</span>
                    <span className='italic'>{post&&(post.content.length/1000).toFixed(0)} mins read</span>
                </div>

                <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post&&post.content}}>

                </div>

                <div className='max-w-4xl mx-auto w-full'>
                    <AddCallToAction/>
                </div>
            </>
        )}
    </main>
  )
}
