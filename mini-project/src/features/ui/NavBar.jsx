import { Link } from "react-router-dom"
import './styleNavbar.css'
function NavBar() {
    return (
        <div className="navbar" style={{ display: "flex", gap: 12 }}>
            <Link to ='/homepage'>Home Page</Link>
            <Link to ='/createuser'>Create Work</Link>
        </div>
    )
}

export default NavBar
