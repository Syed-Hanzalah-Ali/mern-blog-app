import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react"
import {Link} from "react-router-dom"

export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user)

  const [userPosts,setUserPosts]=useState([])
  useEffect(()=>{
    async function getPosts(){
      try {
        const response=await fetch(`/api/v1/posts/getposts?userId=${currentUser._id}`)
        const result=await response.json()
        // console.log(result);
        if(result.success===true){
          setUserPosts(result.data.posts)

        }
      } 
      catch (error) {
        console.log(error.message);
        
      }
      
    }

    if(currentUser?.isAdmin){
      getPosts()
    }
  },[currentUser._id])
  // console.log(userPosts);
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin&&userPosts.length>0?(
        <Table hoverable className='shadow-md'>

          <TableHead>
            <TableRow>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
              
            </TableRow>
          </TableHead>

          <TableBody className='divide-y'>
            {userPosts.map((post,index)=>{
              return(
                <TableRow key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link to={`/post/${post._id}`}>
                      <img src={post.image} alt='post.image' className='w-20 h-10 object-cover bg-gray-500'/>

                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className='font-medium text-gray-900 dark:text-white ' 
                    to={`/post/${post._id}`}>
                      {post.title}
                    </Link>
                    </TableCell>
                  <TableCell>{post.category}</TableCell>

                  <TableCell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </TableCell>

                  <TableCell>
                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      )
      :(
        <p>You have no post yet</p>
      )}
    </div>
  )
}
