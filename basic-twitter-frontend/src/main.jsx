import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx'
import Feed from './components/Feed.jsx'
import Signup from './components/Signup.jsx'
// import 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
  },{
    path: "/login",
    element: <Login />
  },{
    path: "/feed",
    element: <Feed />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
