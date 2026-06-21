import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow,Modal,ModalHeader,ModalBody,Button} from "flowbite-react"
import {Link} from "react-router-dom"
import {HiOutlineExclamationCircle} from "react-icons/hi"
import {FaCheck, FaCross, FaTimes} from "react-icons/fa"

export default function DashUsers() {
  const {currentUser}=useSelector((state)=>state.user)

  const [users,setUsers]=useState([])
  const [showMore,setShowMore]=useState(true)

  const [userIdToDelete,setUserIdToDelete]=useState(null)
  const [openModal, setOpenModal] = useState(false);

  async function handleShowMore(){
    const startIndex=users.length
    // console.log(startIndex);

    try {
      const response= await fetch(`/api/v1/users/getusers?startIndex=${startIndex}`)
      const result=await response.json()
      if(result.success===true){
        // console.log(result.data.posts);
        setUsers((prev)=>[...prev,...result.data.users])

        if(result.data.users.length<9){
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

  async function handleDeleteUser(){
    setOpenModal(false)
    try {
      const response=await fetch(`/api/v1/users/deleteuser/${currentUser._id}/${userIdToDelete}`,{
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
    async function getUsers(){
      try {
        const response=await fetch(`/api/v1/users/getusers`)
        const result=await response.json()
        // console.log(result);
        if(result.success===true){
          setUsers(result.data.users)
          if(result.data.users.length<9){
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
      getUsers()
    }
  },[currentUser._id])
  // console.log(userPosts);
  
  return (
    <div className='w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin&&users.length>0?(
        <>
          <Table hoverable className='shadow-md'>

            <TableHead>
              <TableRow>
                <TableHeadCell>Date created</TableHeadCell>
                <TableHeadCell>Profile Picture</TableHeadCell>
                <TableHeadCell>username</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Admin</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                
              </TableRow>
            </TableHead>

            <TableBody className='divide-y'>
              {users.map((user,index)=>{
                return(
                  <TableRow key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <img src={user.profilePicture} alt='user.image' className='w-10 h-10 rounded-full object-cover bg-gray-500'/>
                    </TableCell>
                    <TableCell>
                      {user.username}
                      </TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin?<FaCheck className='text-green-500'/>:<FaTimes className='text-red-500'/>}</TableCell>

                    <TableCell>
                      <span onClick={()=>{setOpenModal(true);setUserIdToDelete(user._id)}} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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
        <p>There is no user yet</p>
      )}

      <Modal show={openModal} size='md' onClose={()=>setOpenModal(false)} popup>
        <ModalHeader/>
        <ModalBody>
            
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDeleteUser}>
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
