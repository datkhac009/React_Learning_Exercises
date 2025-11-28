
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Mainlayout from './layout/Mainlayout'
import Home from './features/pages/Home';
import CreateUser from './features/work/CreateWork';
import PageError from './features/ui/PageError'
import { useLocalStorage } from './features/hook/useLocalStorage'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { setInitialUsers } from './features/work/WorkSlice'

function App() {
    const [valueWork,setValueWork] = useLocalStorage([],"work")
    const dispatch =  useDispatch()
    const work = useSelector((s) => s.user.users)

    useEffect(() => {
      if(valueWork && valueWork.length > 0){
        dispatch(setInitialUsers(valueWork))//nếu có dữ liệu từ local thì data của local sẽ được lưu vào trong users
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        setValueWork(work)
    },[work,setValueWork])


    const router = createBrowserRouter([
        
      {
        element : <Mainlayout />,
        children :[
          {
            path:"/",
            element:<Navigate to="/homepage"/>
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
      
    ])
  return (<RouterProvider router={router}/>)
}

export default App
