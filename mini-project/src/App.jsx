
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Mainlayout from './layout/Mainlayout'
import Home from './features/ui/Home'
import CreateUser from './features/user/CreateUser'
import PageError from './features/ui/PageError'

function App() {

    const router = createBrowserRouter([
      {
        element : <Mainlayout />,
        children :[
          {
            path :"/",
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

      }
    ])
  return (<RouterProvider router={router}/>)
}

export default App
