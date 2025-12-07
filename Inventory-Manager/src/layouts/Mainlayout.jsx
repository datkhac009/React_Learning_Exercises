//import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import ListProduct from "../modules/product/ListProduct";

function Mainlayout() {
  return (
    <div className="app-layout">
      <header>
        <Header />
      </header>

      <main className="app-main">
        <ListProduct />
      </main>
    </div>
  );
}

export default Mainlayout;
