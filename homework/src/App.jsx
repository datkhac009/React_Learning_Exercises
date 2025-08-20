import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Step1 from "./component/Step1/Step1";
import App_v2 from "./component/Step2/App_v2";
import App_v3 from "./component/Step3/App_v3";
import App_v5 from "./component/Step5/App_v5";
import App_v7 from "./component/Step7/App_v7";
import App_v9 from "./component/Step9/App_v9";
import MainLayout from "./layout/MainLayout";
import Header from "./layout/Header";
import NavLink from "./route/NavLink";
import Error from "./component/Error/Error";
import { Color_ctx } from "./component/context/Color_ctx";
import App_v8 from "./component/Step8/App_v8";

function App() {
  return (
    <>
      <Color_ctx>
        
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<NavLink />} />
            <Route path="app1" element={<Step1 />} />
            <Route path="app2" element={<App_v2 />} />
            <Route path="app3" element={<App_v3 />} />
            <Route path="app4" element={<App_v5 />} />
            <Route path="app5" element={<App_v7 />} />
            <Route path="app6" element={<App_v9 />} />
            <Route path="app7" element={<App_v8/>} />

          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      </Color_ctx>
      {/* <Step1 />
      <App_v2 /> 
      <App_v3 />
      <App_v5 />
      <App_v9 />
      <App_v7 /> */}
    </>
  );
}

export default App;
