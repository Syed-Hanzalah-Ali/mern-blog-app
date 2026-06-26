import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow,Modal,ModalHeader,ModalBody,Button} from "flowbite-react"
import {Link} from "react-router-dom"
import {HiOutlineExclamationCircle} from "react-icons/hi"
import {FaCheck, FaCross, FaTimes} from "react-icons/fa"

export default function DashComments() {
  const {currentUser}=useSelector((state)=>state.user)

  const [comments,setComments]=useState([])
  const [showMore,setShowMore]=useState(true)

  const [commentIdToDelete,setCommentIdToDelete]=useState(null)
  const [openModal, setOpenModal] = useState(false);

  async function handleShowMore(){
    const startIndex=comments.length
    // console.log(startIndex);

    try {
      const response= await fetch(`/api/v1/comments/getcomments?startIndex=${startIndex}`)
      const result=await response.json()
      if(result.success===true){
        // console.log(result.data.posts);
        setComments((prev)=>[...prev,...result.data.comments])

        if(result.data.comments.length<9){
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

  async function handleDeleteComment(){
    setOpenModal(false)
    try {
      const response=await fetch(`/api/v1/comments/deleteComment/${commentIdToDelete}`,{
        method:"DELETE"
      })
      const result=await response.json()
      // console.log(result);
      
      // console.log(postIdToDelete);
      if(result.success===true){
        setComments((prev)=>
          prev.filter((comment)=>comment._id!==commentIdToDelete)
        )
      }
      
    } 
    catch (error) {
      console.log(error.message);
      
    }
  }
  

  useEffect(()=>{
    async function getComments(){
      try {
        const response=await fetch(`/api/v1/comments/getcomments`)
        const result=await response.json()
        // console.log(result);
        if(result.success===true){
          setComments(result.data.comments)
          if(result.data.comments.length<9){
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
      getComments()
    }
  },[currentUser._id])
  // console.log(userPosts);
  
  return (
    <div className='w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin&&comments.length>0?(
        <>
          <Table hoverable className='shadow-md'>

            <TableHead>
              <TableRow>
                <TableHeadCell>Date Updated</TableHeadCell>
                <TableHeadCell>Comment content</TableHeadCell>
                <TableHeadCell>Number of Likes</TableHeadCell>
                <TableHeadCell>PostId</TableHeadCell>
                <TableHeadCell>UserId</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                
              </TableRow>
            </TableHead>

            <TableBody className='divide-y'>
              {comments.map((comment)=>{
                return(
                  <TableRow key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{comment.content} </TableCell>
                    <TableCell>
                      {comment.likeBy.length}
                      </TableCell>

                    <TableCell>{comment.post}</TableCell>
                    <TableCell>{comment.wroteBy}</TableCell>

                    <TableCell>
                      <span onClick={()=>{setOpenModal(true);setCommentIdToDelete(comment._id)}} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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
        <p>There is no comments yet</p>
      )}

      <Modal show={openModal} size='md' onClose={()=>setOpenModal(false)} popup>
        <ModalHeader/>
        <ModalBody>
            
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDeleteComment}>
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
