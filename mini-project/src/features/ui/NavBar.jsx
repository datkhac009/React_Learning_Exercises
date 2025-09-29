import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div className="container" style={{ display: "flex", gap: 12 }}>
            <Link to ='/'>Home Page</Link>
            <Link to ='/createuser'>CreateUser</Link>
        </div>
    )
}

export default NavBar
