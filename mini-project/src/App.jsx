
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Mainlayout from './layout/Mainlayout'
import Home from './features/ui/Home'
import CreateUser from './features/user/CreateUser'
import PageError from './features/ui/PageError'
import Login from './features/login/Login'

function App() {

    const router = createBrowserRouter([
        
      {
        element : <Mainlayout />,
        children :[
          {
            path:"/",
            element:<Navigate to="/homepage"/>//sau sẽ để login hiện ra đầu khi sau khi mount
          },
          {
            path :"/homepage",
            element :<Home />
          },
          {
            path :"/createuser",
            element:<CreateUser /> 
          },
  
          {
            path: "*",
            element :<PageError />
          }
        ]

      },
      {
            index:true,
            path:"/login",
            element:<Login />
          },
    ])
  return (<RouterProvider router={router}/>)
}

export default App
