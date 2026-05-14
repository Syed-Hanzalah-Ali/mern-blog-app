import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className='text-3xl text-blue-600'>
      navbar
      <Outlet/>
    </div>
  )
}
