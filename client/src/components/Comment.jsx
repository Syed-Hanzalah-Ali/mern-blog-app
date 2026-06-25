import React, { useEffect, useState } from 'react'
import moment from "moment"
import {FaThumbsUp} from "react-icons/fa"
import {useSelector} from "react-redux"
import {Button, Textarea} from "flowbite-react"

export default function Comment({comment,onLike,onEdit}) {
    const {currentUser}=useSelector((state)=>state.user)

    const [isEditing,setIsEditing]=useState(false)
    const [editedCommentContent,setEditedCommentContent]=useState()
    
    
    async function handleEdit(){
        setIsEditing(true)
        setEditedCommentContent(comment.content)
    }
    console.log(editedCommentContent);

    function handleSave(){
        onEdit(comment._id,editedCommentContent)
        setIsEditing(false)
    }
    
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={comment&& comment?.WroteBy?.profilePicture} alt="user.image" />
        </div>

        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-sm truncate'>{comment? `@${comment?.WroteBy?.username}` :"anonyous user"}</span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>

            {/* editing */}
            {
                isEditing?(
                    <>
                        <Textarea 
                        className='mb-2'
                        value={editedCommentContent}
                        onChange={(e)=>setEditedCommentContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                            <Button type='button' outline size='sm' onClick={()=>handleSave()}
                            >Save</Button>

                            <Button type='button' outline size='sm' onClick={()=>setIsEditing(false)}
                            >Cancel</Button>

                        </div>
                        
                    </>

                )
                :(
                    <>
                        <p className='text-gray-500 mb-2'>{comment.content}</p>

                        {/* like functionality */}
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button onClick={()=>onLike(comment._id)} type='button' className={`text-gray-400 hover:text-blue-500 
                            ${
                                currentUser&&comment?.likeBy?.includes
                                (currentUser._id)&&'!text-blue-500'
                            }`}>
                                <FaThumbsUp/>
                            </button>
                            <p className='text-gray-400'
                            >{comment.noOfLikes>0&&(comment.noOfLikes) + " " + (comment.noOfLikes===1?"like":"likes")}</p>
                        
                            {
                                currentUser&&(comment.WroteBy._id===currentUser._id || currentUser.isAdmin)&&(
                                    <button onClick={handleEdit} className='text-gray-400 hover:text-blue-500'>
                                        Edit
                                    </button>
                                )
                            }
                        </div>
                        
                    </>
                ) 
            }
        </div>

    </div>
  )
}
