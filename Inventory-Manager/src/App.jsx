
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Mainlayout from '../src/layouts/Mainlayout'
import Header from './components/Header'

function App() {  
   const router = createBrowserRouter([
    {
      path:'/',
      element:<Mainlayout />,
      children:[
        {
          index:true,
          element:<Header />
        }
      ]
    }
  ])

  return (<RouterProvider router={router}/>)
}

export default App
