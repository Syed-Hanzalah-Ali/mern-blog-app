import { Alert, Button, Textarea, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
export default function CommentSection({postId}) {
    // console.log(postId);

    const {currentUser}=useSelector((state)=>state.user)
    const navigate=useNavigate()

    const [comment,setComment]=useState('')
    const [commentError,setCommentError]=useState(null)
    const [loading,setLoading]=useState(false)
    const [postComments,setPostComments]=useState([])

    async function handleCommentSubmit(e){
        e.preventDefault()
        setLoading(true)
        setCommentError(null)
        
        try {
            const response=await fetch("/api/v1/comments/create",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({postId,userId:currentUser._id,content:comment})
            })
    
            const result=await response.json()
            if(result.success===true){
                // console.log("new: ",result.data);
                
                setComment('')
                setPostComments([result.data[0],...postComments])
                setLoading(false)
                setCommentError(null)
            }
            
            

        } catch (error) {
            // console.log(error.message);
            setLoading(false)
            setCommentError(error.message)
            
        }
        
    }

    useEffect(()=>{
        if(!postId){return}
        async function fetchPostComment(){
            try {
                const response=await fetch(`/api/v1/comments/getPostComments/${postId}`)
                const result=await response.json()
    
                if(result.success===true){
                    // console.log("all comments: ",result.data);
                    setPostComments(result.data.map((c)=>({...c,noOfLikes:c.likeBy.length})))
                }
            } catch (error) {
                console.log(error.message);
                
            }
            // console.log(result.data);
            
        }

        fetchPostComment()
    },[postId])
    // console.log(postComments);

    async function handleLike(commentId){
            if(!currentUser){
                navigate('/sign-in')
            }
            try {
                const response=await fetch(`/api/v1/comments/likeComment/${commentId}`,{
                    method:'PUT'
                })
                const result=await response.json()
                if(result.success===true){
                    // console.log(result.data);
                    // console.log(postComments);

                    setPostComments((prev)=>prev.map((p)=>p._id===result.data._id?{...p,likeBy:result.data.likeBy,noOfLikes: result.data.likeBy.length}:p))
                    
                    
                }
            } catch (error) {
                console.log(error.message);
                
            }
    }
    
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser?(
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as: </p>
                <img className='h-5 w-5 object-contain rounded-full' src={currentUser.profilePicture}/>
                <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username}
                </Link>
            </div>
        )
        :(
            <div className='text-sm text-gray-400 my-5 flex -gap-1'>
                You must be signed in to comment. 
                <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                    Sign in
                </Link>
            </div>
        )
        }

        {
            currentUser&&(
                <form onSubmit={handleCommentSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea onChange={(e)=>setComment(e.target.value)}
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5 '>
                        <p className='text-gray-500 text-xs'>{200-comment.length} characters remaining</p>
                        <Button disabled={loading} type='submit' className="bg-gradient-to-br from-green-600 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                            Submit
                        </Button>
                    </div>
                    {
                        commentError&&(
                            <Alert color='failure' className='mt-5'>{commentError}</Alert>

                        )
                    }
                </form>

                )}
                {
                    postComments.length===0?(
                        <p className='text-sm my-5'>No comments yet!</p>
                    )
                    :(
                        <>
                            <div className='text-sm my-5 flex items-center gap-1'>
                                <p>Comments</p>
                                <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                                    <p>{postComments.length}</p>
                                </div>
                            </div>
                            {postComments.map((postComment,index)=>{
                                return(
                                    <Comment onLike={handleLike} comment={postComment} key={postComment._id}/>
                                )
                            })}
                        </>
                )
                }
    </div>
  )
}
