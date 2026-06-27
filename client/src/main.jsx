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

import { store } from './redux/store.js'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'
import ThemeProvider from './components/themeProvider.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import Search from './pages/Search.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    Component:App,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },

      // private routes component (layout)  
      {
        Component:PrivateRoute,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
        ]
      },
      // admin routes component (layout)  
      {
        Component:AdminRoute,
        children:[
          {
            path:"create-post",
            element:<CreatePost/>
          },
          {
            path:"update-post/:postId",
            element:<UpdatePost/>
          }
        ]
      },

      {
        path:"projects",
        element:<Projects/>
      },
      {
        path:"sign-up",
        element:<SignUp/>
      },
      {
        path:"sign-in",
        element:<SignIn/>
      },
      {
        path:"post/:postId",
        element:<PostPage/>
      },
      {
        path:"search",
        element:<Search/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(

  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider children={<RouterProvider router={router}/>}/>
{/* 
  same as:
  
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider> */}
        

      
    </Provider>
  </PersistGate>

)
