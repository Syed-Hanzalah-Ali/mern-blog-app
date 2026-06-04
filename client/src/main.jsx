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
      {
        path:"dashboard",
        element:<Dashboard/>
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
