import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddCallToAction from '../components/AddCallToAction'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'

export default function PostPage() {

    const {postId}=useParams()
    // console.log(postId);
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [post,setPost]=useState(null)
    const [recentPosts,setRecentPosts]=useState(null)

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
    // console.log(post);

    // get recent post
    useEffect(()=>{
        async function getRecentPost(){
            try {
                
                const response=await fetch(`/api/v1/posts/getposts?limit=3`)
                const result=await response.json()

                if(result.success===true){
                    
                    // console.log("recent posts ",result.data);
                    setRecentPosts(result.data.posts)
                    
                }
                
                
            } 
            catch (error) {
                

                console.log(error.message);
                    
            }
        }

        getRecentPost()
    },[postId])
    // console.log(recentPosts);
    
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

                <CommentSection postId={post&&post._id}/>

                <div className='flex flex-col justify-center items-center mb-5'>
                    <h1 className='text-xl mt-5'>Recent articles</h1>
                    <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                        {
                            recentPosts&&(
                                recentPosts.map((recentPost)=>{
                                    return(
                                        <PostCard key={recentPost._id} post={recentPost}/>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </>
        )}
    </main>
  )
}
