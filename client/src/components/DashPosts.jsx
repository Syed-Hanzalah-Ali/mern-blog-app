import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow,Modal,ModalHeader,ModalBody,Button} from "flowbite-react"
import {Link} from "react-router-dom"
import {HiOutlineExclamationCircle} from "react-icons/hi"

export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user)

  const [userPosts,setUserPosts]=useState([])
  const [showMore,setShowMore]=useState(true)

  const [postIdToDelete,setPostIdToDelete]=useState(null)
  const [openModal, setOpenModal] = useState(false);

  async function handleShowMore(){
    const startIndex=userPosts.length
    // console.log(startIndex);

    try {
      const response= await fetch(`/api/v1/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const result=await response.json()
      if(result.success===true){
        // console.log(result.data.posts);
        setUserPosts((prev)=>[...prev,...result.data.posts])

        if(result.data.posts.length<9){
            // console.log("length is less than 9");
            setShowMore(false)
        }
        
      }
    } 
    catch (error) {
      console.log(error.message);
        
    }

  
    
  }
  // console.log(userPosts.length);
  
  // console.log(showMore);

  async function handleDeletePost(){
    setOpenModal(false)
    try {
      const response=await fetch(`/api/v1/posts/delete/${currentUser._id}/${postIdToDelete}`,{
        method:"DELETE"
      })
      const result=await response.json()
      // console.log(result);
      
      // console.log(postIdToDelete);
      if(result.success===true){
        setUserPosts((prev)=>
          prev.filter((post)=>post._id!==postIdToDelete)
        )
      }
      
    } 
    catch (error) {
      console.log(error.message);
      
    }
  }
  

  useEffect(()=>{
    async function getPosts(){
      try {
        const response=await fetch(`/api/v1/posts/getposts?userId=${currentUser._id}`)
        const result=await response.json()
        // console.log(result);
        if(result.success===true){
          setUserPosts(result.data.posts)
          if(result.data.posts.length<9){
            // console.log("length is less than 9");
            setShowMore(false)
          }

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
    <div className='w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin&&userPosts.length>0?(
        <>
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
                      <span onClick={()=>{setOpenModal(true);setPostIdToDelete(post._id)}} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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

          {
            showMore&&(
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                show more
              </button>
            )
          }
        </>

      )
      :(
        <p>You have no post yet</p>
      )}

      <Modal show={openModal} size='md' onClose={()=>setOpenModal(false)} popup>
        <ModalHeader/>
        <ModalBody>
            
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
        </Modal>
    </div>
  )
}
