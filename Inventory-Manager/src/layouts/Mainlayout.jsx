import { Outlet } from "react-router-dom";

import Header from "./../components/Header";
import { ToastContainer } from "react-toastify";

function Mainlayout() {
  return (
    <div className="app-layout">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss  
        draggable
        pauseOnHover
        theme="colored"
      />
      <header>
        <Header />
      </header>

      <main className="app-main">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Mainlayout;
