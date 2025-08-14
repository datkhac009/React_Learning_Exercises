
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Step1 from './component/Step1/Step1'
import App_v2 from './component/Step2/App_v2'
import App_v3 from './component/Step3/App_v3'
import App_v5 from './component/Step5/App_v5'
import App_v7 from './component/Step7/App_v7'
import App_v9 from './component/Step9/App_v9'
import MainLayout from './layout/MainLayout'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element = {<MainLayout />}/>
        <Route path='/app1' element ={<Step1 />}/>
        <Route path='/app2' element ={<App_v2 />}/>
        <Route path='/app3' element ={<App_v3 />}/>
        <Route path='/app4' element ={<App_v5 />}/>
        <Route path='/app5' element ={<App_v7 />}/>
        <Route path='/app6' element ={<App_v9 />}/>
      </Routes>
    </BrowserRouter>
      {/* <Step1 />
      <App_v2 /> 
      <App_v3 />
      <App_v5 />
      <App_v9 />
      <App_v7 /> */}
    </>
  )
}

export default App
