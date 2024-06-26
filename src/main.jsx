import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import Login from './pages/LoginCred/Login.jsx'
import Signup from './pages/LoginCred/Signup.jsx'
import Upload from './components/Feedup/Upload.jsx'
import Home from './pages/Home/index.jsx'
import store from './utils/redux/store.js'
import HomeLayout from './layout/HomeLayout/index.jsx'
import DashboardLayout from './layout/DashboardLayout/index.jsx'
import UserFeedbacks from './pages/Dashboard/UserFeedbacks/index.jsx'
import FeedAnalysis from './pages/FeedAnalysis/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    children:[
      {
        path:'/',
        element:<Navigate to={'/home'}/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/upload',
        element:<Upload/>
      },
      {
        path:'analysis/:feed_id',
        element:<FeedAnalysis/>
      },
      {
        path:'/dashboard',
        element:<DashboardLayout/>,
        children:[
          {
            path:'/dashboard',
            element:<Navigate to={'/dashboard/feedbacks'}/>
          },
          {
            path:'/dashboard/feedbacks',
            element:<UserFeedbacks/>
          },
        ]
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)