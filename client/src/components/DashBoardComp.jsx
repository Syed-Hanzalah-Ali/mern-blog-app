import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi"
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react"
import {Link} from "react-router-dom"

export default function DashBoardComp() {

    const {currentUser}=useSelector((state)=>state.user)

    const [users,setUsers]=useState([])
    const [totalUsers,setTotalUsers]=useState([])
    const [lastMonthUsers,setLastMonthUsers]=useState([])

    const [posts,setPosts]=useState([])
    const [totalPosts,setTotalPosts]=useState([])
    const [lastMonthPosts,setLastMonthPosts]=useState([])
    
    const [comments,setComments]=useState([])
    const [totalComments,setTotalComments]=useState([])
    const [lastMonthComments,setLastMonthComments]=useState([])

    useEffect(()=>{
        async function fetchUsers(){
            try {
                const response=await fetch("/api/v1/users/getusers?limit=5")
                const result=await response.json()
                
                if(result.success===true){
                    // console.log(result.data);
                    setUsers(result.data.users)
                    setTotalUsers(result.data.totalUsers)
                    setLastMonthUsers(result.data.lastMonthUsers)
                    
                }
            } 
            catch (error) {
                console.log(error.message);
                
            }
        }

        async function fetchPosts(){
            try {
                const response=await fetch("/api/v1/posts/getposts?limit=5")
                const result=await response.json()
                
                if(result.success===true){
                    // console.log(result.data);
                    setPosts(result.data.posts)
                    setTotalPosts(result.data.totalPosts)
                    setLastMonthPosts(result.data.lastMonthTotalPost)
                    
                }
            } 
            catch (error) {
                console.log(error.message);
                
            }
        }

        async function fetchComments(){
            try {
                const response=await fetch("/api/v1/comments/getComments?limit=5")
                const result=await response.json()
                
                if(result.success===true){
                    // console.log(result.data);
                    setComments(result.data.comments)
                    setTotalComments(result.data.totalComments)
                    setLastMonthComments(result.data.lastMonthTotalComments)
                    
                }
            } 
            catch (error) {
                console.log(error.message);
                
            }
        }

        if(currentUser?.isAdmin){
            fetchUsers()
            fetchPosts()
            fetchComments()
        }
    },[currentUser._id])

    // console.log(users);
    // console.log(totalUsers);
    // console.log(lastMonthUsers);
    // console.log(posts);
    // console.log(totalPosts);
    // console.log(lastMonthPosts);
    // console.log(comments);
    // console.log(totalComments);
    // console.log(lastMonthComments);
    
    
    
    
  return (
    <div className='p-3 md:mx-auto'>

        <div className='flex-wrap flex gap-4 justify-center'>

            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-72 rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                        <p className='text-2xl '>{totalUsers}</p>
                    </div>
                    <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>

                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp/>
                        {lastMonthUsers}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                </div>
            </div>

            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-72 rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                        <p className='text-2xl '>{totalPosts}</p>
                    </div>
                    <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg'/>

                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp/>
                        {lastMonthUsers}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                </div>
            </div>

            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-72 rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                        <p className='text-2xl '>{totalComments}</p>
                    </div>
                    <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg'/>

                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp/>
                        {lastMonthUsers}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                </div>
            </div>

        </div>

        <div className='flex flex-wrap gap-4 py-3 mx:auto justify-center'>

            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent users</h1>
                    <Button outline color='dark' className='dark:text-white px-5 py-2 border-2 hover:border-none text-black rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-green-700 hover:to-blue-700 hover:text-white hover:border-transparent'>
                        <Link to='/dashboard?tab=users'>See more</Link>
                    </Button>
                </div>

                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>User image</TableHeadCell>
                            <TableHeadCell>Username</TableHeadCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users&&(
                            users.map((user)=>{
                                return(
                                    <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <TableCell>
                                            <img src={user.profilePicture} alt="user.image" className='w-10 h-10 rounded-full bg-gray-500' />
                                        </TableCell>

                                        <TableCell>{user.username}</TableCell>
                                    </TableRow>
                                )
                            })
                        )}

                    </TableBody>
                </Table>
            </div>

            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent posts</h1>
                    <Button outline color='dark' className='dark:text-white px-5 py-2 border-2 hover:border-none text-black rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-green-700 hover:to-blue-700 hover:text-white hover:border-transparent'>
                        <Link to='/dashboard?tab=comments'>See more</Link>
                    </Button>
                </div>

                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Comment content</TableHeadCell>
                            <TableHeadCell>Likes</TableHeadCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {comments&&(
                            comments.map((comment)=>{
                                return(
                                    <TableRow key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <TableCell className='w-96'>
                                            <p className='line-clamp-2'>{comment.content}</p>
                                        </TableCell>

                                        <TableCell>{comment.likeBy.length}</TableCell>
                                    </TableRow>
                                )
                            })
                        )}

                    </TableBody>
                </Table>
            </div>

            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent posts</h1>
                    <Button outline color='dark' className='dark:text-white px-5 py-2 border-2 hover:border-none text-black rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-green-700 hover:to-blue-700 hover:text-white hover:border-transparent'>
                        <Link to='/dashboard?tab=posts'>See more</Link>
                    </Button>
                </div>

                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Post image</TableHeadCell>
                            <TableHeadCell>Post title</TableHeadCell>
                            <TableHeadCell>Post category</TableHeadCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {posts&&(
                            posts.map((post)=>{
                                return(
                                    <TableRow key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <TableCell>
                                            <img src={post.image} alt="user.image" className='w-14 h-10 rounded-md bg-gray-500' />
                                        </TableCell>

                                        <TableCell className='w-96'>{post.title}</TableCell>

                                        <TableCell className='w-5'>{post.category}</TableCell>
                                    </TableRow>
                                )
                            })
                        )}

                    </TableBody>
                </Table>
            </div>

        </div>
    </div>
  )
}
