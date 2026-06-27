import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Select, Spinner, TextInput } from "flowbite-react"
import PostCard from '../components/PostCard'
export default function Search() {
  
  const [sidebarData,setSidebarData]=useState({
    search:'',
    sort:'desc',
    category:'Uncategorized'
  })
  const [loading,setLoading]=useState(false)
  const [posts,setPosts]=useState([])
  const [showMore,setShowMore]=useState(false)

  const path=useLocation()
  const navigate=useNavigate()

  // run initially and when search params will change
  useEffect(()=>{
    const urlParams=new URLSearchParams(path.search)
    // console.log(urlParams.toString());
    
    const search=urlParams.get('search')
    const sort=urlParams.get('sort')
    const category=urlParams.get('category')
    if(search || sort || category){
        // console.log("form submit");
        // console.log(urlParams);
        
        setSidebarData({
          ...sidebarData,
          search:search,
          sort:sort,
          category:category
        })
    }

    async function fetchPosts(){
      setLoading(true)
      const searchQuery=urlParams.toString()
      
      try {
        const response=await fetch(`/api/v1/posts/getposts?${searchQuery}`)
        const result=await response.json()
        if(result.success===false){
          setLoading(false)
          return
        }
        setPosts(result.data.posts)
        setLoading(false)
        if(result.data.posts.length===9){
          setShowMore(true)
        }
        else{
          setShowMore(false)
        }
      } 
      catch (error) {
        console.log(error.message);
      }
    }
    fetchPosts()
  },[path.search])
  // console.log(posts);

  function handleChange(e){
    
    if(e.target.id==='search'){
      setSidebarData({...sidebarData,search:e.target.value})
    }
    
    if(e.target.id==='sort'){
      const order=e.target.value || 'desc'
      setSidebarData({...sidebarData,sort:order})
    }

    if(e.target.id==='category'){
      const cat=e.target.value || 'Uncategorized'
      setSidebarData({...sidebarData,category:cat})
    }
    
  }

  async function handleSubmit(e){
      e.preventDefault()
      const urlParams=new URLSearchParams(path.search)
      urlParams.set('search',sidebarData.search)
      urlParams.set('sort',sidebarData.sort)
      urlParams.set('category',sidebarData.category)

      const searchQuery=urlParams.toString()
      navigate(`/search?${searchQuery}`)

  }
  // console.log(sidebarData);
  // console.log(posts);

  async function handleShowmore(){
    const startIndex=posts.length
    const urlParams=new URLSearchParams(path.search)
    urlParams.set('startIndex',startIndex)
      const searchQuery=urlParams.toString()
      
      const response=await fetch(`/api/v1/posts/getPosts?${searchQuery}`)
      const result=await response.json()

      if(result.success===true){
        setPosts([...posts,...result.data.posts])
        if(result.data.posts.length===9){
          setShowMore(true)
        }
        else{
          setShowMore(false)
        }
      }
  }
  
  
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8 ' onSubmit={handleSubmit}>

          <div className='flex items-center gap-2 '>
            <label className='whitespace-nowrap font-semibold'>Search Term</label>
            <TextInput placeholder='search...' id='search' type='text'
            value={sidebarData.search} 
            onChange={handleChange}/>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'
            className=''>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>

            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select onChange={handleChange} value={sidebarData.category} id='category'
            className=''>
              <option value='Uncategorized'>Uncategorized</option>
              <option value='reactjs'>Reactjs</option>
              <option value='Nextjs'>Nextjs</option>
              <option value='javascript'>Javascript</option>

            </Select>
          </div>

          <Button type='submit' outline color='light' className='dark:text-white px-5 py-2 border-2 hover:border-none text-black rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-green-700 hover:to-blue-700 hover:text-white hover:border-transparent'>
            Apply Filters
          </Button>
        </form>
      </div>

      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts Result:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {
            (!loading&&posts.length===0)&&(
              <p className='text-xl text-gray-500 '>No post found.</p>
            )
          }
          {
            loading&&(
              <div className='flex justify-center items-center min-h-screen w-full'>
                  <Spinner size='xl' className='mx-auto'/>
              </div>
            )
          }
          {
            (!loading&&posts.length>0)&&(
              posts.map((post)=>{
                return(
                  <PostCard key={post._id} post={post}/>
                  
                )
              })
            )
          }
          {
            showMore&&(
              <button onClick={handleShowmore} className='text-teal-500 text-lg hover:underline p-7 w-full'>Show More</button>
            )
          }
        </div>
      </div>
    </div>
  )
}
