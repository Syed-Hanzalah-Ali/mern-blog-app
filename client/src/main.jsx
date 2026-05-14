import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    Component:App,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"about",
        Component:About
      },
      {
        path:"dashboard",
        Component:Dashboard
      },
      {
        path:"projects",
        Component:Projects
      },
      {
        path:"sign-up",
        Component:SignUp
      },
      {
        path:"sign-in",
        Component:SignIn
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
