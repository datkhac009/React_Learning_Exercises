import { Outlet } from "react-router-dom";

import Header from './../components/Header';

function Mainlayout() {
  return (
    <div className="app-layout">
      <header>
        <Header />
      </header>

      <main className="app-main">
        <Outlet />   

      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default Mainlayout;
