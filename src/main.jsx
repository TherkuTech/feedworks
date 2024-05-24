import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './pages/LoginCred/Login.jsx'
import Signup from './pages/LoginCred/Signup.jsx'
import Upload from './pages/LoginCred/Feedup/Upload.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },

  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/upload',
    element:<Upload/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)