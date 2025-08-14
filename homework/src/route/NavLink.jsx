import { Link } from "react-router-dom";
import Header from "../layout/Header";

function NavLink() {
  return (
    <div>
      <div className="header">
        
      </div>
      <ul>
        <li><Link to='app1'>Bài 1</Link></li>
         <li><Link to='app2'>Bài 2</Link></li>
         <li><Link  to='app3'>Bài 3</Link></li>
        <li><Link  to='app4'>Bài 4</Link></li>
        <li><Link  to='app5'>Bài 5</Link></li>
        <li><Link  to='app6'>Bài 6</Link></li>
      </ul>
    </div>
  );
}

export default NavLink;
