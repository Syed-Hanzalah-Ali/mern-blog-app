import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3'>
        <div>
          <h1 className='text-3xl font-semibold my-7'>About MERN Blog</h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>Welcome to our MERN Blog Platform, a modern and interactive blogging application built using the MERN stack (MongoDB, Express.js, React, and Node.js).</p>
          </div>

      
          <h2 className="text-2xl font-semibold mt-6 mb-2 ">
            Features
          </h2>
          <div className='text-md text-gray-500 flex flex-col gap-6'>

            <ul className="list-disc list-inside space-y-2">
              <li>Secure authentication using JWT.</li>
              <li>Google Sign-In with Firebase OAuth.</li>
              <li>Role-based access for Admins and Users.</li>
              <li>Admin Dashboard for managing blog posts.</li>
              <li>Admins can create, edit, and delete posts.</li>
              <li>Users can browse, search, and read blog posts.</li>
              <li>Like and comment on posts.</li>
              <li>Responsive design for desktop and mobile devices.</li>
            </ul>
          </div>
        
          <h2 className="text-2xl font-semibold mt-6 mb-4">
            User Roles
          </h2>
          <div>
            <h3 className="text-xl font-medium mb-2">
              Administrator
            </h3>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-500">
              <li>Access the Admin Dashboard.</li>
              <li>Create, edit, and delete blog posts.</li>
              <li>Manage platform content efficiently.</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">
              Registered Users
            </h3>

            <ul className="list-disc list-inside space-y-2 text-gray-500 mb-4">
              <li>Sign in securely with JWT or Google OAuth.</li>
              <li>Read blog posts.</li>
              <li>Search posts by title or category.</li>
              <li>Like posts.</li>
              <li>Comment and interact with the community.</li>
            </ul>

          </div>
        



        </div>
      </div>
    </div>
  )
}
