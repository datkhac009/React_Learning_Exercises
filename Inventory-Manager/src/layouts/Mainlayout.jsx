import { Outlet } from "react-router-dom";

import Header from "./../components/Header";
import { ToastContainer } from "react-toastify";

function Mainlayout({darkMode, setDarkMode}) {
  return (
    <div className="app-layout">
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss  
        draggable
        pauseOnHover
        theme="colored"
      />
      <header>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Mainlayout;
